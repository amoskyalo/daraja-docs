export function encodeCredentials(consumerKey: string, consumerSecret: string): string {
    const credentials = `${consumerKey}:${consumerSecret}`;
    return Buffer.from(credentials).toString('base64');
}
