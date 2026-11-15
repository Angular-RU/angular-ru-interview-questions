import catalog from '../../skills/catalog.json';
import naming from '../../skills/naming.json';

export const skills = catalog;
export type Skill = (typeof skills)[number];

export const skillName = (slug: string): string => `${naming.prefix}${slug}`;

const releaseUrl =
    'https://github.com/Angular-RU/angular-ru-interview-questions/releases/download/skills-latest';

export const installAllCommand = `npx skills@latest add ${releaseUrl}/all.zip`;

export const installCommand = (slug: string): string =>
    `npx skills@latest add ${releaseUrl}/${skillName(slug)}.zip`;
