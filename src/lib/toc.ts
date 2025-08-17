import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

export interface HeadingItem {
    level: number;
    text: string;
    id: string;
}

interface HeadingNode extends Node {
    depth: number;
    children: Array<{
        type: string;
        value?: string;
    }>;
}

export function extractTableOfContents(content: string): HeadingItem[] {
    const headings: HeadingItem[] = [];
    const idCountMap: Record<string, number> = {};

    const tree = remark().parse(content);

    visit(tree, 'heading', (node: HeadingNode) => {
        if (node.depth >= 2 && node.depth <= 4) {
            const text = node.children
                .map((child) => (child.type === 'text' ? child.value || '' : ''))
                .join('')
                .trim();

            let baseId = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-');

            if (idCountMap[baseId] != null) {
                idCountMap[baseId] += 1;
                baseId = `${baseId}-${idCountMap[baseId]}`;
            } else {
                idCountMap[baseId] = 0;
            }

            headings.push({
                level: node.depth,
                text,
                id: baseId,
            });
        }
    });

    return headings;
}
