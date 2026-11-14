import assert from 'node:assert/strict';
import {existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalog = JSON.parse(readFileSync(join(root, 'skills/catalog.json'), 'utf8'));
const check = process.argv.includes('--check');
const maxChunkSize = 48_000;
const generated = new Set();

function convertQuestions(source, slug) {
    const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const sourceCount = (body.match(/<details(?:\s|>)/gi) ?? []).length;
    let convertedCount = 0;

    const converted = body.replace(
        /<details>\s*<summary(?:\s[^>]*)?>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi,
        (_, question, content) => {
            convertedCount++;
            const title = question.replace(/<[^>]+>/g, '').trim();
            let answer = content.trim().replace(/^<br\s*\/?>\s*/i, '').trim();
            answer = answer.replace(/^<table><tr><td>\s*/i, '').replace(/\s*<\/td><\/tr><\/table>$/i, '');
            return '\n\n#### Вопрос: ' + title + '\n\n' + answer.trim() + '\n\n';
        },
    );

    assert(convertedCount > 0, 'No questions extracted from ' + slug);
    // Some answers contain literal HTML examples with <details> tags.
    assert(sourceCount - convertedCount <= 1, 'Unconverted questions in ' + slug);
    const markdown = converted.replace(
        /(!\[[^\]]*\]\()(assets\/[^)]+)(\))/g,
        (_, before, asset, after) =>
            before +
            'https://raw.githubusercontent.com/Angular-RU/angular-ru-interview-questions/main/src/pages/' +
            slug +
            '/' +
            asset +
            after,
    );

    return {markdown, count: convertedCount};
}

function splitIntoChunks(markdown) {
    const sections = markdown.split(/(?=^###\s)/m);
    const chunks = [];
    let current = {text: '', topics: new Set()};
    let lastTopic = 'Основы';

    const flush = () => {
        if (!current.text.trim()) return;
        chunks.push({text: current.text.trim(), topics: [...current.topics]});
        current = {text: '', topics: new Set()};
    };

    for (const section of sections) {
        const match = section.match(/^###\s+(.+)$/m);
        if (match) lastTopic = match[1].trim();
        const pieces = section.length > maxChunkSize
            ? section.split(/(?=^#### Вопрос: )/m)
            : [section];

        for (const piece of pieces) {
            if (!piece.trim()) continue;
            if (current.text.length && current.text.length + piece.length > maxChunkSize) flush();
            current.text += piece;
            current.topics.add(lastTopic);
        }
    }
    flush();
    return chunks;
}

function generateSkill(skill) {
    const page = readFileSync(join(root, 'src/pages', skill.slug, 'index.md'), 'utf8');
    const {markdown, count} = convertQuestions(page, skill.slug);
    const chunks = splitIntoChunks(markdown);
    const items = new Map();
    const index = [];
    for (const [i, chunk] of chunks.entries()) {
        const filename = 'part-' + String(i + 1).padStart(2, '0') + '.md';
        const file = 'skills/' + skill.slug + '/references/' + filename;
        const questions = (chunk.text.match(/^#### Вопрос: /gm) ?? []).length;
        const topics = chunk.topics.join(', ');
        items.set(file, [
            '# ' + skill.title + ' — вопросы и ответы, часть ' + (i + 1),
            '',
            '> Автоматически сгенерировано из src/pages/' + skill.slug + '/index.md. Не редактируйте вручную.',
            '',
            chunk.text,
            '',
        ].join('\n'));
        index.push('- [' + topics + '](references/' + filename + ') — ' + questions + ' вопросов');
    }
    assert.equal(chunks.reduce((sum, chunk) => sum + (chunk.text.match(/^#### Вопрос: /gm) ?? []).length, 0), count);

    items.set('skills/' + skill.slug + '/SKILL.md', [
        '---',
        'name: ' + skill.slug,
        'description: ' + JSON.stringify('Вопросы и ответы для технического собеседования по теме ' + skill.title + '. Используйте для подготовки, проверки знаний и проведения интервью.'),
        '---',
        '',
        '# ' + skill.title + ' — подготовка к собеседованию',
        '',
        'Скилл содержит **' + count + ' вопросов с ответами** из репозитория Angular-RU/angular-ru-interview-questions. Материалы включены в папку references/ и доступны без интернета.',
        '',
        '## Работа с вопросами',
        '',
        '1. Учитывайте запрос пользователя: обучение, объяснение конкретной темы, тренировка или пробное интервью.',
        '2. При интервью задавайте **по одному вопросу** из файлов references/, не раскрывайте ответ до ответа кандидата.',
        '3. Оценивайте ответ, сопоставляя его с Коротким ответом и Полным ответом исходного материала. Уточняйте пробелы и приводите примеры из базы вопросов.',
        '4. Учитывайте желаемый уровень Junior, Middle или Senior. Не придумывайте содержимое источника и не выдавайте собственные дополнения за текст справочника.',
        '5. Если пользователь попросил объяснение, отвечайте сразу, а не запускайте обязательное интервью. Сохраняйте язык общения пользователя.',
        '6. Для API, которые могут измениться, отличайте формулировку источника от актуальных фактов. При необходимости проверяйте официальную документацию.',
        '',
        '## Вопросы и ответы по разделам',
        '',
        ...index,
        '',
        'Исходный раздел: https://angular-ru.github.io/interview/' + skill.slug + '/',
        '',
    ].join('\n'));
    return items;
}

for (const skill of catalog) {
    const items = generateSkill(skill);
    for (const [relative, content] of items) {
        generated.add(relative);
        const absolute = join(root, relative);
        if (check) {
            assert(existsSync(absolute), 'Missing generated file: ' + relative);
            assert.equal(readFileSync(absolute, 'utf8'), content, 'Outdated generated file: ' + relative);
        } else {
            mkdirSync(join(absolute, '..'), {recursive: true});
            writeFileSync(absolute, content);
        }
    }

    const references = join(root, 'skills', skill.slug, 'references');
    if (existsSync(references)) {
        for (const filename of readdirSync(references)) {
            const relative = 'skills/' + skill.slug + '/references/' + filename;
            if (!generated.has(relative) && filename.startsWith('part-') && filename.endsWith('.md')) {
                if (check) throw new Error('Stale generated file: ' + relative);
                unlinkSync(join(references, filename));
            }
        }
    }
}
console.log((check ? 'Verified' : 'Generated') + ' question banks and skill instructions for ' + catalog.length + ' topics.');
