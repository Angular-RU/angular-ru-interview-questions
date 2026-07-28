import {readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const PAGES_DIRECTORY = path.resolve('src/pages');
const SHORT_ANSWER_LABEL = '**Короткий ответ**';
const FULL_ANSWER_LABEL = '**Полный ответ**';
const MAX_SHORT_ANSWER_LENGTH = 420;
const CHECK_MODE = process.argv.includes('--check');

const findMarkdownFiles = async (directory) => {
    const entries = await readdir(directory, {withFileTypes: true});
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...(await findMarkdownFiles(entryPath)));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(entryPath);
        }
    }

    return files;
};

const stripInlineMarkdown = (value) =>
    value
        .replace(/!\[[^\]]*\]\([^)]*\)/gu, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
        .replace(/`([^`]+)`/gu, '$1')
        .replace(/<[^>]+>/gu, ' ')
        .replace(/[*_~]+/gu, '')
        .replace(/&nbsp;/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim();

const shorten = (value) => {
    if (value.length <= MAX_SHORT_ANSWER_LENGTH) {
        return value;
    }

    let sentenceEnd = -1;

    for (const match of value.matchAll(/[.!?](?:[»”"')\]]*)\s+/gu)) {
        const end = (match.index ?? 0) + match[0].trimEnd().length;

        if (end > MAX_SHORT_ANSWER_LENGTH) {
            break;
        }

        if (end >= 100) {
            sentenceEnd = end;
        }
    }

    if (sentenceEnd > 0) {
        return value.slice(0, sentenceEnd);
    }

    const clipped = value.slice(0, MAX_SHORT_ANSWER_LENGTH + 1);
    const lastSpace = clipped.lastIndexOf(' ');

    return `${value.slice(0, lastSpace > 0 ? lastSpace : MAX_SHORT_ANSWER_LENGTH).trimEnd()}…`;
};

const createShortAnswer = (answer) => {
    const withoutCode = answer
        .replace(/```[\s\S]*?```/gu, '\n\n')
        .replace(/~~~[\s\S]*?~~~/gu, '\n\n')
        .replace(/<details\b[\s\S]*?<\/details>/giu, '\n\n')
        .replace(/<figure\b[\s\S]*?<\/figure>/giu, '\n\n');

    const blocks = withoutCode
        .split(/\n\s*\n/gu)
        .map((block) => block.trim())
        .filter(Boolean);

    const proseBlock = blocks.find((block) => {
        if (/^(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|>|!\[|\||<)/u.test(block)) {
            return false;
        }

        return /\p{Letter}/u.test(stripInlineMarkdown(block));
    });

    const listBlock = blocks.find((block) => /^(?:[-*+]\s|\d+[.)]\s)/u.test(block));
    const source = proseBlock ?? listBlock;

    if (!source) {
        return 'Краткая суть раскрыта в полном ответе с кодом или практическим примером.';
    }

    const normalized = stripInlineMarkdown(source.replace(/^(?:[-*+]\s|\d+[.)]\s)/u, ''));

    return shorten(normalized);
};

const findMatchingDetails = (source, openingEnd) => {
    const tagPattern = /<\/?details\b[^>]*>/giu;
    tagPattern.lastIndex = openingEnd;

    let depth = 1;
    let match;

    while ((match = tagPattern.exec(source))) {
        if (/^<\/details/iu.test(match[0])) {
            depth -= 1;
        } else {
            depth += 1;
        }

        if (depth === 0) {
            return {
                closeStart: match.index,
                closeEnd: tagPattern.lastIndex,
            };
        }
    }

    throw new Error('Найден незакрытый <details>.');
};

const transformQuestion = (block, stats) => {
    if (!/<summary\b/iu.test(block)) {
        return block;
    }

    const tableStart = '<table><tr><td>';
    const tableEnd = '</td></tr></table>';
    const tableStartIndex = block.indexOf(tableStart);
    const tableEndIndex = block.lastIndexOf(tableEnd);

    if (tableStartIndex < 0 || tableEndIndex < tableStartIndex) {
        return block;
    }

    stats.questions += 1;

    if (block.includes(SHORT_ANSWER_LABEL) && block.includes(FULL_ANSWER_LABEL)) {
        stats.alreadyMigrated += 1;
        return block;
    }

    if (block.includes(SHORT_ANSWER_LABEL) || block.includes(FULL_ANSWER_LABEL)) {
        throw new Error('Вопрос содержит только одну из двух обязательных подписей ответа.');
    }

    const answerStart = tableStartIndex + tableStart.length;
    const answer = block.slice(answerStart, tableEndIndex);
    const shortAnswer = createShortAnswer(answer);
    const answerSeparator = answer.startsWith('\n') ? '' : '\n\n';
    const replacement = `${tableStart}\n\n${SHORT_ANSWER_LABEL}\n\n${shortAnswer}\n\n${FULL_ANSWER_LABEL}${answerSeparator}${answer}`;

    stats.migrated += 1;

    return `${block.slice(0, tableStartIndex)}${replacement}${block.slice(tableEndIndex)}`;
};

const transformDetails = (source, stats) => {
    const openingPattern = /<details\b[^>]*>/giu;
    let output = '';
    let cursor = 0;
    let opening;

    while ((opening = openingPattern.exec(source))) {
        output += source.slice(cursor, opening.index);

        const match = findMatchingDetails(source, openingPattern.lastIndex);
        const openingTag = opening[0];
        const inner = source.slice(openingPattern.lastIndex, match.closeStart);
        const transformedInner = transformDetails(inner, stats);
        const block = `${openingTag}${transformedInner}${source.slice(match.closeStart, match.closeEnd)}`;

        output += transformQuestion(block, stats);
        cursor = match.closeEnd;
        openingPattern.lastIndex = cursor;
    }

    output += source.slice(cursor);

    return output;
};

const countOccurrences = (source, value) => source.split(value).length - 1;

const files = await findMarkdownFiles(PAGES_DIRECTORY);
const totals = {
    files: files.length,
    changedFiles: 0,
    questions: 0,
    migrated: 0,
    alreadyMigrated: 0,
};

for (const file of files) {
    const source = await readFile(file, 'utf8');
    const detailsBefore = countOccurrences(source, '<details');
    const stats = {questions: 0, migrated: 0, alreadyMigrated: 0};
    const result = transformDetails(source, stats);
    const detailsAfter = countOccurrences(result, '<details');
    const shortAnswers = countOccurrences(result, SHORT_ANSWER_LABEL);
    const fullAnswers = countOccurrences(result, FULL_ANSWER_LABEL);

    if (detailsBefore !== detailsAfter) {
        throw new Error(`${file}: изменилось количество <details>.`);
    }

    if (shortAnswers !== stats.questions || fullAnswers !== stats.questions) {
        throw new Error(
            `${file}: ожидалось ${stats.questions} пар ответов, найдено ${shortAnswers}/${fullAnswers}.`,
        );
    }

    if (result !== source) {
        totals.changedFiles += 1;

        if (CHECK_MODE) {
            throw new Error(`${file}: найден вопрос без явных короткого и полного ответов.`);
        }

        await writeFile(file, result);
    }

    totals.questions += stats.questions;
    totals.migrated += stats.migrated;
    totals.alreadyMigrated += stats.alreadyMigrated;
}

console.log(JSON.stringify(totals, null, 2));
