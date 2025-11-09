import { Command } from 'commander';
import { AuthService } from './services/auth';
const program = new Command();

program.name('mpesa-sdk').version('0.0.1').description('M-Pesa SDK CLI');

//auth command: TODO: BEAUTIFY THE COMMAND OUTPUT
program
    .command('auth')
    .description('Generate access token')
    .requiredOption('-c, --consumer-key <consumer-key>', 'M-Pesa consumer key')
    .requiredOption('-s, --consumer-secret <consumer-secret>', 'M-Pesa consumer secret')
    .option('-e, --environment <environment>', 'M-Pesa environment (sandbox or production)', 'sandbox')
    .action(async (options) => {
        const { consumerKey, consumerSecret, environment } = options;
        const authService = new AuthService(consumerKey, consumerSecret, environment);

        try {
            console.log(`Generating access token for ${environment} environment...`);
            const token = await authService.generateToken();
            console.log('\nToken generation successful!');
            console.log('━'.repeat(50));
            console.log('Access Token:', token);
            console.log('━'.repeat(50));
            console.log('\nThis token is valid for approximately 1 hour');
        } catch (error: any) {
            console.error('\n Authentication failed:', error.message);
            if (error.responseData) {
                console.error('Response:', JSON.stringify(error.responseData, null, 2));
            }
            process.exit(1);
        }
    });

program.parse(process.argv);
