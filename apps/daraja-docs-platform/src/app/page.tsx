'use client';

import React from 'react';
import { Stack } from '@mui/material';
import {
    HeroSection,
    AboutSection,
    MiniProgramSection,
    HaveQuestionsSection,
    FaqsSection,
    CtaSection,
    FooterSection,
} from '../features/landing-page';

const Home = () => {
    return (
        <Stack>
            <HeroSection />
            <AboutSection />
            <MiniProgramSection />
            <HaveQuestionsSection />
            <FaqsSection />
            <CtaSection />
            <FooterSection />
        </Stack>
    );
};

export default Home;
