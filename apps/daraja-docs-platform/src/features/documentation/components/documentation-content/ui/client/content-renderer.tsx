'use client';

import { useMemo } from 'react';
import { useVersionManager } from '../../../../../../shared/context';
import { useSearchParams } from '../../../../../../shared/hooks';
import { MDXRenderer } from '../../../../../markdown/components';
import { Playground } from '../../../../../playground';
import { BottomNavigation } from '../../../bottom-navigation';
import { AIQuestionInput } from './ai-question-input';

interface ContentRendererProps {
    doc: any;
    prevDoc?: any;
    nextDoc?: any;
    hideTabs?: boolean;
}

export const ContentRenderer = ({ doc, prevDoc, nextDoc, hideTabs }: ContentRendererProps) => {
    const { version } = useVersionManager();
    const { getParam } = useSearchParams();
    const activeTab = getParam('tab') || 'documentation';

    const data = useMemo(() => doc.docs[version] ?? doc.docs.v2, [doc.docs, version]);
    const { serializedDocs: mdxSource } = data;

    return (
        <>
            <Playground apiSpecsYaml={doc.apiSpecsYaml} hideTabs={hideTabs}>
                <MDXRenderer mdxSource={mdxSource} />
                <BottomNavigation prevDoc={prevDoc} nextDoc={nextDoc} />

                {activeTab !== 'playground' && <AIQuestionInput />}
            </Playground>
        </>
    );
};
