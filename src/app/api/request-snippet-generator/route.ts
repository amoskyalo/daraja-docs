import { NextRequest, NextResponse } from 'next/server';
import codegen from 'postman-code-generators';
import { Request } from 'postman-collection';

type Language = {
    key: string;
    label: string;
    variants: {
        key: string;
    }[];
};

interface RequestBody {
    method: string;
    url: string;
    body?: Record<string, any>;
    headers?: Record<string, string>;
}

interface LanguageVariant {
    key: string;
    variant: string;
    label: string;
}

interface ConversionResult {
    key: string;
    variant: string;
    snippet?: string;
    error?: string;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const { method, url, body, headers = {} }: RequestBody = await req.json();

    const languages: Language[] = codegen.getLanguageList();

    const allLanguages: LanguageVariant[] = [];

    languages.forEach((language) => {
        language.variants.forEach((variant) => {
            allLanguages.push({ 
                key: language.key, 
                variant: variant.key, 
                label: `${language.label} - ${variant.key}` 
            });
        });
    });

    const requestHeaders = [
        { key: 'Content-Type', value: 'application/json' },
        ...Object.entries(headers).map(([key, value]) => ({ key, value }))
    ];

    const request = new Request({
        url: url,
        method: method,
        header: requestHeaders,
        body: body ? {
            mode: 'raw',
            raw: JSON.stringify(body),
        } : undefined,
    });

    const promises = allLanguages.map((language): Promise<ConversionResult> => {
        return new Promise((resolve) => {
            codegen.convert(
                language.key,
                language.variant,
                request,
                { 
                    indentCount: 4, 
                    indentType: 'Space', 
                    trimRequestBody: true, 
                    followRedirect: true 
                },
                (error: any, snippet: string) => {
                    if (error) {
                        resolve({ 
                            key: language.key, 
                            variant: language.variant, 
                            error: error.message 
                        });
                    } else {
                        resolve({ 
                            key: language.key, 
                            variant: language.variant, 
                            snippet 
                        });
                    }
                },
            );
        });
    });

    const results = await Promise.all(promises);

    const snippets: Record<string, string> = {};
    results.forEach((result: ConversionResult) => {
        const { variant, snippet, error } = result;
        snippets[variant] = error || snippet || '';
    });

    return NextResponse.json(snippets);
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const supportedLanguages: Language[] = codegen.getLanguageList();

    const languages: LanguageVariant[] = [];

    supportedLanguages.forEach((language) => {
        language.variants.forEach((variant) => {
            languages.push({ 
                key: language.key, 
                variant: variant.key, 
                label: `${language.label} - ${variant.key}` 
            });
        });
    });

    return NextResponse.json({ languages });
};