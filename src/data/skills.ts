import catalog from '../../skills/catalog.json';

export const skills = catalog;
export type Skill = (typeof skills)[number];

export const installAllCommand = 'npx skills@latest add Angular-RU/angular-ru-interview-questions';

export const installCommand = (slug: string): string => `${installAllCommand} --skill ${slug}`;
