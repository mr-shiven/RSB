import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection';
import AboutUs from './AboutUs';
import Cards from './Cards';
import UserFeedback from './UserFeedback';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import useSendLocation from './hooks/useSendLocation';

export default function HomePage() {
    // useSendLocation();
    return (
        <>
            <Navbar />
            <HeroSection />
            <AboutUs />
            <Cards />
            <UserFeedback />
            <Footer />
            <ScrollToTopButton />
        </>
    )
}
