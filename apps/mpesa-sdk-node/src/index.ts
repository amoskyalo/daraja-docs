import dotenv from 'dotenv';
import { AuthService } from './services/auth';
dotenv.config();

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;

const authService = new AuthService(CONSUMER_KEY, CONSUMER_SECRET, 'sandbox');

async function testAuth() {
    try {
        const token = await authService.generateToken();
        console.log('Token:', token);

        const getToken = await authService.getToken();
        console.log('Get Token:', getToken);
    } catch (error) {
        console.error('Error generating token:', error);
    }
}

testAuth();
