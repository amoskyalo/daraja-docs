import fs from 'fs';
import path from 'path';

export function getAllDocPaths(): string[][] {
    const docsDir = path.join(process.cwd(), 'documentation', 'v2');
    const paths: string[][] = [];

    function scanDirectory(dir: string, relativePath: string[] = []): void {
        try {
            const items = fs.readdirSync(dir, { withFileTypes: true });

            items.forEach((item) => {
                if (item.isDirectory()) {
                    scanDirectory(path.join(dir, item.name), [...relativePath, item.name]);
                } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
                    const fileName = item.name.replace(/\.(mdx|md)$/, '');
                    paths.push([...relativePath, fileName]);
                }
            });
        } catch (error) {
            console.error(`Error scanning directory ${dir}:`, error);
        }
    }

    scanDirectory(docsDir);
    return paths;
}
