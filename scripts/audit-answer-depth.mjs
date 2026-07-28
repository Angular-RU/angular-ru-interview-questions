import {readdir, readFile} from 'node:fs/promises';
import {relative, resolve} from 'node:path';
import process from 'node:process';

const ROOT = resolve(process.cwd(), 'src/pages');
const STRICT = process.argv.includes('--strict');
const MIN_ADDED_CHARACTERS = 180;
const MIN_LENGTH_RATIO = 1.35;

async function collectMarkdownFiles(directory) {
    const entries = await readdir(directory, {withFileTypes: true});
    const nestedFiles = await Promise.all(
        entries.map(async (entry) => {
            const path = resolve(directory, entry.name);

            if (entry.isDirectory()) {
                return collectMarkdownFiles(path);
            }

            return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
        }),
    );

    return nestedFiles.flat();
}

function cleanAnswer(value) {
    return value
        .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[`*_>#|\-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function extractQuestions(markdown) {
    return [...markdown.matchAll(/<details>[\s\S]*?<\/details>/g)].flatMap(([block]) => {
        const question = block.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.trim();
        const shortMarker = '**Короткий ответ**';
        const fullMarker = '**Полный ответ**';
        const shortStart = block.indexOf(shortMarker);
        const fullStart = block.indexOf(fullMarker);

        if (!question || shortStart === -1 || fullStart === -1 || fullStart <= shortStart) {
            return [];
        }

        const shortAnswer = block.slice(shortStart + shortMarker.length, fullStart);
        const fullEnd = block.indexOf('</td>', fullStart);
        const fullAnswer = block.slice(fullStart + fullMarker.length, fullEnd);

        return [{question, shortAnswer: cleanAnswer(shortAnswer), fullAnswer: cleanAnswer(fullAnswer)}];
    });
}

function diagnose({shortAnswer, fullAnswer}) {
    if (!shortAnswer || !fullAnswer) {
        return 'empty answer';
    }

    if (shortAnswer === fullAnswer) {
        return 'full answer duplicates short answer';
    }

    const addedCharacters = fullAnswer.startsWith(shortAnswer)
        ? fullAnswer.length - shortAnswer.length
        : Number.POSITIVE_INFINITY;
    const lengthRatio = fullAnswer.length / shortAnswer.length;

    if (addedCharacters < MIN_ADDED_CHARACTERS) {
        return `full answer only adds ${addedCharacters} characters`;
    }

    if (lengthRatio < MIN_LENGTH_RATIO) {
        return `full answer is only ${lengthRatio.toFixed(2)}x longer`;
    }

    return null;
}

const files = await collectMarkdownFiles(ROOT);
const findings = [];
let questionCount = 0;

for (const file of files) {
    const markdown = await readFile(file, 'utf8');
    const questions = extractQuestions(markdown);

    questionCount += questions.length;

    for (const question of questions) {
        const reason = diagnose(question);

        if (reason) {
            findings.push({file: relative(process.cwd(), file), question: question.question, reason});
        }
    }
}

if (findings.length === 0) {
    console.log(`Checked ${questionCount} questions in ${files.length} files: no shallow full answers found.`);
    process.exit(0);
}

console.log(`Found ${findings.length} shallow full answers in ${questionCount} questions:\n`);

for (const finding of findings) {
    console.log(`- ${finding.file}: ${finding.question}`);
    console.log(`  ${finding.reason}`);
}

console.log('\nA full answer should add reasoning, trade-offs, edge cases or a practical example.');

if (STRICT) {
    process.exitCode = 1;
}
