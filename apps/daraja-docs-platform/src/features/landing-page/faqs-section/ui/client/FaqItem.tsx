'use client';

import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQ {
    title: string;
    description: string;
    category: string;
}

interface FaqItemProps {
    faqs: FAQ[];
}

export const FaqItem = ({ faqs }: FaqItemProps) => {
    return (
        <Box maxWidth="md">
            {faqs.map((faq, index) => (
                <Accordion key={index} elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography component="span">{faq.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{faq.description}</AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};
