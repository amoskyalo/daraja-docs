import Anthropic from '@anthropic-ai/sdk';
import { Supermemory } from 'supermemory';

const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
});

const client = new Supermemory({
    apiKey: process.env.NEXT_PUBLIC_SUPERMEMORY_API_KEY,
});

export { anthropic, client };
