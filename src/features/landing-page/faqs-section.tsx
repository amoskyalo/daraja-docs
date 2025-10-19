import {
    Box,
    Container,
    Stack,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        title: "What is a 'Short code'?",
        description:
            'A short code is the unique number that is allocated to a pay bill or buy goods organization through they will be able to receive customer payment. It could be a Pay bill, Buy Goods or Till Number.',
        category: 'General Concepts',
    },
    {
        title: 'What Short code do you use?',
        description:
            'When testing in the sandbox environment all APIs Short code 1 = all APIs except B2B i.e. ‘Party B’ where you use Short Code 2. Lipa na M-Pesa online Short code = 174379 (FOR LIPA NA MPESA ONLINE ONLY). The test credentials are provided in Sandbox.',
        category: 'General Concepts',
    },
    {
        title: 'How do I generate a token on sandbox?',
        description:
            'Kindly go to the API menu, under the list of APIs click on the OAuth API, on the right, click on the GENERATE TOKEN, scroll down to the Query parameters and click on the HTTP BASIC, on the pop up, enter your Consumer key and Consumer Secret (This are found under my app, view app details tab, Keys), save to set authentications, click on send this request button, your requests will be generated and access token available below on tab “Response”.',
        category: 'Authentication & Tokens',
    },
    {
        title: 'Can I re-register URLs in the sandbox?',
        description:
            'If on sandbox, you can re-register the URLs. This is a test environment, so can you just re-register and enter the new ones.',
        category: 'Sandbox Environment',
    },
    {
        title: 'Is there a refund to the test funds for STK push?',
        description:
            'Yes, for the refund of test funds, the system is set auto reverse at 6am next day or you can share your number for a reversal request to APIfeedback@safaricom.co.ke or APIsupport@safaricom.co.ke.',
        category: 'Sandbox Environment',
    },
    {
        title: 'How long does it take for my app to be approved?',
        description: 'The approval will be done within 24 working hours. (Monday to Friday, 8am to 5pm).',
        category: 'Production & Go-Live Process',
    },
    {
        title: 'How long do I wait for you to activate my external validation?',
        description: '24 working hours.',
        category: 'Transaction & Product Operations',
    },
    {
        title: 'How do I add a product to my app on production?',
        description:
            "To add a product, navigate to MyApps and select your entity. Select 'Add API Products' on your respective app and proceed as required.",
        category: 'Production & Go-Live Process',
    },
    {
        title: 'Where can I get the consumer key and secret?',
        description:
            "To get the consumer key and secret, log in to Daraja, click on your app and you'll find the details under keys.",
        category: 'Authentication & Tokens',
    },
    {
        title: 'Do I need a pass key to Go Live?',
        description: 'You only need a pass key if your app has a Lipa na M-Pesa product or M-Pesa express product.',
        category: 'Authentication & Tokens',
    },
    {
        title: 'How can I get the B2B API?',
        description:
            'Business Buy Goods, Business Pay Bill and B2C Account Top Up are B2B use cases currently available on the APIs section.',
        category: 'Transaction & Product Operations',
    },
    {
        title: 'How do I get a C2C API?',
        description: 'Unfortunately, we do not have any available C2C API as of now.',
        category: 'Transaction & Product Operations',
    },
    {
        title: 'Can I have both B2C and C2B on my app?',
        description: "It's only possible to have one of these products on an app. Either B2C or C2B.",
        category: 'Transaction & Product Operations',
    },
    {
        title: 'Am a merchant, how can I get validation for my short code?',
        description: 'To get external validation, send us an email request.',
        category: 'Integration & URL Configuration',
    },
    {
        title: 'Why was my app revoked?',
        description:
            'An app will be revoked if it is a duplicate to another app. When you create an app with the short code of another approved app, it becomes a duplicate app. You can create a new app, but for us to approve it, it must have a different short code.',
        category: 'Account & Portal Management',
    },
    {
        title: 'Do APIs work outside Kenya?',
        description:
            'M-PESA is available in all the Vodacom countries. However, they all run as different stand-alone mobile money service providers within their borders, regulated with the different Central Banks for each country. Therefore, integrating with Safaricom’s M-PESA in Kenya means that only the users in Kenya will be able to consume the service. You will be required to have a collection account in all the countries and integrate with the APIs for all the countries.',
        category: 'General Concepts',
    },
    {
        title: 'Is there a way we can move cash from a C2B account to a B2C account?',
        description:
            'Yes, you can move cash using the M-PESA org portal, just ensure the following first: the user carrying out this process has the business manager role, and there exists another user who has the business manager role to approve this transaction. This is a maker checker type of transaction.',
        category: 'Transaction & Product Operations',
    },
    {
        title: 'Can you integrate using child pay bill number?',
        description: 'Yes, you can.',
        category: 'General Concepts',
    },
    {
        title: 'I have tried deleting my app on Daraja, but I am getting an error. What should I do?',
        description:
            'For an app to be deleted from our side, send an email request from the registered email on M-Pesa Org Portal or send us a stamped request letter on email, with a director’s signature, the company letter head and today’s date indicated.',
        category: 'Account & Portal Management',
    },
    {
        title: 'Why am I not receiving notifications on my URL?',
        description:
            "The URL you are using could be invalid and that is why you are not able to receive notifications. Create a valid URL and consider the following information: Use publicly available Internet-accessible IP addresses or domain names. All Production URLs must be HTTPS; on Sandbox you're allowed to simulate using HTTP. Avoid using keywords such as M-PESA, M-Pesa, mpesa, Safaricom, exe, exec, cmd, sql, query or any of their variants in either upper or lower cases in your URLs. Do not use public URL testers such as ngrok, mockbin or requestbin, especially on production—they are blocked by the API. Use your own application URLs and do not make them public or share with peers. Validation URL is the one that receives validation request from API upon payment submission, only called if external validation is enabled. Confirmation URL receives confirmation request upon payment completion.",
        category: 'Integration & URL Configuration',
    },
    {
        title: 'Why should my URL be HTTPS and not HTTP in production?',
        description:
            'HTTP is unsecured while HTTPS is secured, and for us to get a response, the URL should be freely accessed by us over the internet.',
        category: 'Integration & URL Configuration',
    },
    {
        title: 'How do I edit the username and KYC on M-PESA portal?',
        description:
            'If you are not a Business Administrator or Business Manager role, you will need to create a Business Manager role and log in to activate it and thus edit the KYC. If the status for the user is still pending active, it means you have not logged in with your user credentials. You will need to log in with the user credentials you created to activate the user account. Click on Search → Organization, enter your organization short code, and click search. Under operators, select your preferred operator and click on the details tab. On the KYC tab, click and edit the preferred contact phone number in the format 254XXXXXXXXX. Change preferred notification channel from email to SMS, click submit and it will save. Now try generating OTP again.',
        category: 'Account & Portal Management',
    },
    {
        title: 'How do I re-register URLs?',
        description:
            'Yes, you can in the sandbox (testing environment) but you cannot change the registered URLs on production. However, we can delete them for you so that you can register new ones. For them to be deleted, send a stamped request letter via email with a director’s signature, the company letterhead and today’s date indicated. Send the email to APIfeedback@safaricom.co.ke or APIsupport@safaricom.co.ke.',
        category: 'Integration & URL Configuration',
    },
    {
        title: 'How do I get SSL certificate?',
        description:
            'From any trusted CA. Safaricom offers SSL Certificates that provide robust server authentication, data encryption and server security to ensure website security and protection against cyber threats.',
        category: 'Production & Go-Live Process',
    },
    {
        title: 'For an administrator to be created on the M-PESA Organization Portal, the below details are required:',
        description:
            'An official request letter on company letterhead signed and stamped by authorized signatories. The letter should have the following details: organization short code, organization name, administrator’s user name, first name, middle name (optional), last name, ID type (National ID, Passport, etc.), scanned ID front and back, ID number, nationality, date of birth, email address, and administrator phone number. Send the letter to M-PESABusiness@Safaricom.co.ke.',
        category: 'Account & Portal Management',
    },
    {
        title: 'How can I reset my M-Pesa admin password?',
        description: 'To reset your password, send an email to M-PESABusiness@Safaricom.co.ke.',
        category: 'Account & Portal Management',
    },
    {
        title: 'How do I add operator roles?',
        description:
            'To add operator roles, write an email to M-PESABusiness@Safaricom.co.ke for an operator role to be added under your short code.',
        category: 'Account & Portal Management',
    },
    {
        title: 'Where do I find the M-Pesa public key certificate?',
        description:
            "To find the M-Pesa Public Key certificate, log in to Daraja, click on Docs, scroll down on the left side and you'll find it there. Click on it and it will automatically download so you can install it.",
        category: 'Authentication & Tokens',
    },
    {
        title: 'Why is my STK showing the organization number and not the organization name?',
        description:
            'This is because when a customer is paying through Fuliza, only the organization number will show, but if the customer is paying directly from M-Pesa, the organization name appears.',
        category: 'Transaction & Product Operations',
    },
    {
        title: 'How do I add a product to my app on Sandbox?',
        description:
            "To add a product to a sandbox app, navigate to MyApps. By default, Sandbox is the active entity. Select 'Add API Products' on your respective app and proceed as required.",
        category: 'Sandbox Environment',
    },
    {
        title: 'How do I delete apps on Sandbox?',
        description:
            "To delete a Sandbox app, navigate to MyApps. By default, Sandbox is the active entity. Select 'Delete App' on your respective app and proceed as required.",
        category: 'Sandbox Environment',
    },
];

const faqCategories = [
    'General Concepts',
    'Authentication & Tokens',
    'Sandbox Environment',
    'Production & Go-Live Process',
    'Integration & URL Configuration',
    'Account & Portal Management',
    'Transaction & Product Operations',
];

const icons = ['🧩', '🔐', '🧪', '🚀', '💬', '🏦', '💸'];

export const FaqsSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>(faqCategories[0]);

    const faqsByCategory = faqs.filter((faq) => faq.category === selectedCategory);
    const index = faqCategories.indexOf(selectedCategory);
    const icon = icons[index];

    return (
        <Container maxWidth="lg" sx={{ px: '0px !important', py: '100px' }}>
            <Stack direction="column" spacing={4} alignItems="center" justifyContent="center">
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                    FAQs.{' '}
                    <Typography variant="h6" color="text.secondary" component="span" sx={{ fontWeight: 500 }}>
                        Your questions answered
                    </Typography>
                </Typography>

                <Stack direction="row" spacing={10}>
                    <Stack>
                        {faqCategories.map((category, index) => (
                            <Button
                                key={index}
                                variant="text"
                                sx={{
                                    color: selectedCategory === category ? 'primary.main' : 'inherit',
                                    textTransform: 'none',
                                    justifyContent: 'left',
                                    fontWeight: selectedCategory === category ? '600' : '400',
                                    opacity: selectedCategory === category ? 1 : 0.7,
                                    '&:hover': {
                                        opacity: 1,
                                    },
                                }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </Stack>

                    <Box maxWidth="md">
                        {/* <Typography variant="h6" sx={{ mb: 2 }}>
                            {icon} {selectedCategory}
                        </Typography> */}

                        {faqsByCategory.map((faq, index) => (
                            <Accordion key={index} elevation={0}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">{faq.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>{faq.description}</AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
};
