import axios from 'axios';
import { MPESA_ENDPOINTS } from '../config/constants';
import { encodeCredentials } from '../utils/encoder';
import { MpesaError } from '../errors/MpesaError';
import { AuthResponse } from '../types/types.auth';

export class AuthService {
    private readonly consumerKey: string;
    private readonly consumerSecret: string;
    private readonly environment: 'sandbox' | 'production';
    private accessToken: string | null = null;
    private tokenExpiry: number | null = null;

    constructor(consumerKey: string, consumerSecret: string, environment: 'sandbox' | 'production' = 'sandbox') {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.environment = environment;
    }

    async generateToken(): Promise<string> {
        try {
            if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
                return this.accessToken;
            }
            const auth = encodeCredentials(this.consumerKey, this.consumerSecret);

            const oauthUrl = MPESA_ENDPOINTS[this.environment].oauth;

            const response = await axios.get<AuthResponse>(oauthUrl, {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });

            this.accessToken = response.data.access_token;
            const expiresIn = Number.parseInt(response.data.expires_in);
            this.tokenExpiry = Date.now() + (expiresIn - 60) * 1000;

            return this.accessToken;
        } catch (error: any) {
            throw new MpesaError('Failed to generate access token', error.response?.status, error.response?.data);
        }
    }

    async getToken(): Promise<string> {
        return this.generateToken();
    }

    clearToken(): void {
        this.accessToken = null;
        this.tokenExpiry = null;
    }
}
