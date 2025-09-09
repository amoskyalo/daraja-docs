import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { question }: { question: string } = await request.json();

        if (!question?.trim()) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        const prompt = `You are a Safaricom's Daraja API support assistant. You should ONLY answer questions specifically related to Safaricom's Daraja API.

        USER QUESTION: ${question}

        Instructions:
            - If the question is about safaricom's daraja api, answer it helpfully
            - If the question is about anything else (general programming, other AI models, unrelated topics, etc.), respond with: "I can only help with questions about Safaricom's Daraja API. Please ask me something related to Safaricom's Daraja."
            - Be helpful and detailed for Safaricom's Daraja API questions
            - Stay focused on Safaricom's Daraja API topics only

        Answer:`;

        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
        });

        return NextResponse.json({
            answer: (response.content[0] as any).text,
        });
    } catch (error) {
        console.error('Error in Claude API:', error);
        return NextResponse.json({ error: 'Failed to process question' }, { status: 500 });
    }
}
