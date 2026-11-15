import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const catalog = JSON.parse(readFileSync(join(root, 'skills/catalog.json'), 'utf8'));
const {prefix} = JSON.parse(readFileSync(join(root, 'skills/naming.json'), 'utf8'));
assert.match(prefix, /^[a-z0-9]+(?:-[a-z0-9]+)*-$/);
const slugs = new Set();
const names = new Set();

for (const skill of catalog) {
    assert.match(skill.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert(!slugs.has(skill.slug), `Duplicate skill: ${skill.slug}`);
    slugs.add(skill.slug);
    const name = `${prefix}${skill.slug}`;
    assert(name.length <= 64, `Skill name exceeds 64 characters: ${name}`);
    assert(!names.has(name), `Duplicate skill name: ${name}`);
    names.add(name);
    assert(skill.title && skill.description && skill.category);
    assert(skill.topics.length >= 3, `Missing topic coverage: ${skill.slug}`);

    const pagePath = join(root, 'src/pages', skill.slug, 'index.md');
    assert(existsSync(pagePath), `Missing topic page: ${skill.slug}`);
    assert.match(readFileSync(pagePath, 'utf8'), /kind:\s*questions/);

    const path = join(root, 'skills', name, 'SKILL.md');
    assert(existsSync(path), `Missing SKILL.md: ${skill.slug}`);
    const content = readFileSync(path, 'utf8');
    assert(content.startsWith(`---\nname: ${name}\ndescription:`), `Invalid frontmatter: ${skill.slug}`);
    assert(content.includes(`/interview/${skill.slug}/`), `Missing handbook link: ${skill.slug}`);
}

const pageSlugs = readdirSync(join(root, 'src/pages'))
    .filter((entry) => existsSync(join(root, 'src/pages', entry, 'index.md')))
    .filter((entry) => /kind:\s*questions/.test(readFileSync(join(root, 'src/pages', entry, 'index.md'), 'utf8')))
    .sort();
assert.deepEqual([...slugs].sort(), pageSlugs, 'Catalog must match all question pages');

const skillDirs = readdirSync(join(root, 'skills'))
    .filter((entry) => statSync(join(root, 'skills', entry)).isDirectory())
    .sort();
assert.deepEqual(skillDirs, [...names].sort(), 'Skill directories must match catalog');

console.log(`Validated ${catalog.length} installable skills and question pages.`);
