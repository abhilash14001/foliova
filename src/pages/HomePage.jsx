import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    AnimatePresence
} from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import { Link } from 'react-router-dom';
import { profile } from '../data/portfolioData';
import { FaChevronDown } from 'react-icons/fa';

// --- Variants remain the same ---
const sentenceVariants = { /* ... */ hidden: { opacity: 1 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.06, delayChildren: i * 0.1 }, }), };
const wordVariants = { /* ... */ hidden: { opacity: 0, y: 20, transition: { type: 'spring', damping: 12, stiffness: 200 } }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } }, };
const pageVariants = { /* ... */ initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } };
const pageTransition = { /* ... */ type: "tween", ease: "anticipate", duration: 0.6 };

// --- Styled Components remain the same up to ContentSection ---
const HeroSection = styled(motion.section)` /* ... */ min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 6rem 1rem 4rem 1rem; position: relative; overflow: hidden; background-color: ${({ theme }) => theme.body}; background-size: cover; background-position: center center; background-repeat: no-repeat; &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient( 180deg, ${({ theme }) => theme.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)'} 0%, ${({ theme }) => theme.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} 70%, ${({ theme }) => theme.body} 100% ); z-index: 1; } `;
const HeroContentWrapper = styled(motion.div)` /* ... */ max-width: 800px; position: relative; z-index: 2; padding: 0 1rem; `;
const AnimatedHeading = styled(motion.h1)` /* ... */ font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 1rem; color: ${({ theme }) => theme.mode === 'light' ? '#1a1a1a' : '#f5f5f5'}; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); font-weight: 700; line-height: 1.2; `;
const AnimatedSubtitle = styled(motion.p)` /* ... */ font-size: clamp(1rem, 2.5vw, 1.4rem); color: ${({ theme }) => theme.mode === 'light' ? '#333' : '#ccc'}; margin: 1.5rem auto 2.5rem auto; font-weight: 300; line-height: 1.7; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); max-width: 650px; `;
const CtaButtons = styled(motion.div)` /* ... */ display: flex; justify-content: center; flex-wrap: wrap; gap: 1.2rem; `;
const TempButton = styled(motion.button)` /* ... */ padding: 0.9rem 2.2rem; font-size: 1rem; font-weight: 600; color: #ffffff; border: none; border-radius: 50px; cursor: pointer; position: relative; overflow: hidden; z-index: 1; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); background-image: linear-gradient(135deg, #ff00ff 0%, #00c4ff 100%); background-size: 250% auto; background-position: 0% 0%; box-shadow: 0px 3px 0px 0px #a000a0, 0px 6px 10px 0px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15); transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-position 0.4s ease-out; &:hover { transform: translateY(-3px); background-position: 100% 0%; box-shadow: 0px 5px 0px 0px #007a99, 0px 10px 15px 0px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2); color: #fff; } &:active { transform: translateY(1px); box-shadow: 0px 1px 0px 0px #a000a0, 0px 2px 4px 0px rgba(0, 0, 0, 0.15), inset 0 2px 3px rgba(0, 0, 0, 0.1); } &:focus-visible { outline: 3px solid #00c4ff; outline-offset: 2px; } `;
const ScrollIndicator = styled(motion.div)` /* ... */ position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: ${({ theme }) => theme.text}; z-index: 3; cursor: pointer; svg { font-size: 2rem; opacity: 0.7; } `;
const ContentSection = styled.section` /* ... */ padding: 6rem 0; overflow: hidden; `;
const SectionTitle = styled(motion.h2)` /* ... */ text-align: center; margin-bottom: 3rem; font-size: clamp(1.8rem, 5vw, 2.5rem); `;

// --- MODIFIED/NEW STYLED COMPONENTS for About Section ---

// Grid container for the About section (image + text)
const AboutGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: 1fr; /* Single column by default */
    gap: 2rem;
    align-items: center; /* Vertically align items */
    max-width: 900px; /* Adjust max width */
    margin: 0 auto;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: 1fr 1.5fr; /* Two columns on medium screens, text wider */
        gap: 4rem;
    }
`;

// Wrapper for the profile image
const ProfileImageWrapper = styled(motion.div)`
    width: 250px; /* Adjust size */
    height: 250px; /* Adjust size */
    border-radius: 50%; /* Circular image */
    overflow: hidden;
    margin: 0 auto; /* Center image in its column on mobile */
    position: relative;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
    border: 5px solid #ad10e799; /* Primary border with alpha */

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 300px;
        height: 300px;
        margin: 0; /* Align to start on desktop */
    }
`;

// The profile image itself
const ProfileImage = styled(motion.img)`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center center; /* Ensure scale happens from center */
`;

// Wrapper for the text content in the grid
const AboutTextWrapper = styled(motion.div)`
    text-align: center; /* Center text on mobile */

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        text-align: left; /* Align text left on desktop */
    }

    p { /* Style paragraph within this section */
        color: ${({ theme }) => theme.secondary};
        line-height: 1.8;
        margin-bottom: 1.5rem;
    }

    a { /* Ensure link inherits wrapper alignment */
        display: inline-block; /* Allows margin auto to potentially work if needed */
    }
`;

// --- End of modified/new components ---

// --- Featured Project Card components remain the same ---
const FeaturedProjectCard = styled(motion.div)` /* ... */ background: ${({ theme }) => theme.cardBg}; border-radius: 15px; box-shadow: ${({ theme }) => theme.cardShadow}; overflow: hidden; max-width: 700px; margin: 2rem auto 0 auto; text-align: left; display: grid; grid-template-columns: 1fr; transition: transform 0.3s ease, box-shadow 0.3s ease; &:hover { transform: scale(1.03); box-shadow: 0 10px 30px rgba(0,0,0,0.15); } @media (min-width: ${({ theme }) => theme.breakpoints.sm}) { grid-template-columns: 1fr 1fr; max-width: 800px; } `;
const FeaturedImageWrapper = styled(motion.div)` /* ... */ height: 250px; overflow: hidden; @media (min-width: ${({ theme }) => theme.breakpoints.sm}) { height: 100%; } img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; } ${FeaturedProjectCard}:hover & img { transform: scale(1.1); } `;
const FeaturedContentWrapper = styled.div` /* ... */ padding: 2rem; display: flex; flex-direction: column; justify-content: center; h3 { color: ${({ theme }) => theme.primary}; margin-bottom: 0.75rem; font-size: 1.5rem; } p { color: ${({ theme }) => theme.secondary}; margin-bottom: 1.5rem; font-size: 0.95rem; } `;

const SectionContent = styled(motion.div)`
    text-align: center;
    max-width: 700px;
    margin: 0 auto 2rem auto;
    color: ${({ theme }) => theme.secondary};
    line-height: 1.8;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
`;
// --- HomePage Component ---
const HomePage = () => {
    const heroRef = useRef(null);
    // ... (Hooks: useScroll, useTransform, useMotionValue, useState, useEffect remain the same) ...
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const parallaxX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], ["-10px", "10px"]);
    const parallaxY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], ["-8px", "8px"]);
    const handleMouseMove = (event) => { /* ... */ const { clientX, clientY } = event; const x = clientX - window.innerWidth / 2; const y = clientY - window.innerHeight / 2; mouseX.set(x); mouseY.set(y); };
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    useEffect(() => { /* ... */ const handleScroll = () => { if (window.scrollY > 100) { setShowScrollIndicator(false); } else { setShowScrollIndicator(true); } }; window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
    const headingText = "Build Stunning Web Experiences";
    const subtitleText = profile.title || "Creative Frontend Developer | UI/UX Enthusiast | Problem Solver";


    // --- Animation Variants for About Section ---
    const aboutGridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 } // Stagger image and text
        }
    };
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: -50 }, // Slide in from left
        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] } }
    };
    const textVariants = {
        hidden: { opacity: 0, x: 50 }, // Slide in from right
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] } }
    };
    // --- End Variants ---


    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {/* === HERO SECTION (remains the same) === */}
            <HeroSection ref={heroRef} onMouseMove={handleMouseMove} style={{ backgroundImage: `url('/images/hero-background.jpg')`, backgroundPositionY: backgroundY }}>
                <HeroContentWrapper style={{ x: parallaxX, y: parallaxY }}>
                    <AnimatedHeading variants={sentenceVariants} initial="hidden" animate="visible">
                        {headingText.split(" ").map((word, index) => ( <motion.span key={word + "-" + index} style={{ display: 'inline-block', marginRight: '0.4em', willChange: 'transform, opacity' }} variants={wordVariants}> {word} </motion.span> ))}
                    </AnimatedHeading>
                    <AnimatedSubtitle variants={sentenceVariants} initial="hidden" animate="visible" custom={1}>
                         {subtitleText.split(" ").map((word, index) => ( <motion.span key={word + "-" + index} style={{ display: 'inline-block', marginRight: '0.25em', willChange: 'transform, opacity' }} variants={wordVariants}> {word} </motion.span> ))}
                    </AnimatedSubtitle>
                    <CtaButtons initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}>
                       <Link to="/projects" style={{ textDecoration: 'none' }}><TempButton whileTap={{ scale: 0.95 }}> View Projects </TempButton></Link>
                       <Link to="/contact" style={{ textDecoration: 'none' }}><TempButton whileTap={{ scale: 0.95 }}> Get In Touch </TempButton></Link>
                    </CtaButtons>
                </HeroContentWrapper>
                <AnimatePresence>{showScrollIndicator && ( <ScrollIndicator initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { delay: 1.8, duration: 0.5 } }} exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }} onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}> <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}> <FaChevronDown /> </motion.div> </ScrollIndicator> )} </AnimatePresence>
            </HeroSection>

            {/* === ABOUT ME SECTION (MODIFIED) === */}
            <ContentSection>
                <div className="container">
                    {/* Using AnimatedSection to trigger the grid animation */}
                    <AnimatedSection amount={0.2} once={true}>
                        <SectionTitle variants={wordVariants} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.5}}>About Me Briefly</SectionTitle>

                        {/* Apply grid layout and staggering variants */}
                        <AboutGrid
                             variants={aboutGridVariants}
                             initial="hidden"
                             whileInView="visible"
                             viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
                        >
                            {/* Profile Image Column */}
                            <ProfileImageWrapper variants={imageVariants}>
                                <ProfileImage
                                    src="/images/profile.png" // <<< YOUR PROFILE IMAGE PATH HERE
                                    alt={profile.name || "Profile Picture"}
                                    whileHover={{ scale: 1.05 }} // Slight zoom on hover
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </ProfileImageWrapper>

                            {/* Text Content Column */}
                            <AboutTextWrapper variants={textVariants}>
                                <p>
                                    A dedicated and creative developer passionate about building beautiful and functional web applications. Exploring new technologies and crafting intuitive user experiences is what drives me. Let's create something amazing together.
                                </p>
                                <Link to="/about" style={{ textDecoration: 'none' }}>
                                    <TempButton whileTap={{ scale: 0.95 }}>Learn More</TempButton>
                                </Link>
                            </AboutTextWrapper>
                        </AboutGrid>
                    </AnimatedSection>
                </div>
            </ContentSection>

            {/* === FEATURED PROJECT SECTION (remains the same) === */}
            <ContentSection>
                 <div className="container">
                    <AnimatedSection animationType="slideInUp" amount={0.2} delay={0.1}>
                         <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                            <SectionTitle variants={wordVariants}>Featured Project</SectionTitle>
                            <SectionContent variants={wordVariants}>
                                Highlighting a project that showcases my skills in React, modern styling, and creating engaging user interfaces.
                            </SectionContent>
                            <FeaturedProjectCard variants={wordVariants}>
                                <FeaturedImageWrapper initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                    <img src="/images/cafe.png" alt="Featured Project" />
                                </FeaturedImageWrapper>
                                <FeaturedContentWrapper>
                                    <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}> Cafe Management System </motion.h3>
                                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}> A simple cafe management system built with React, styled-components, and framer-motion. </motion.p>
                                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }}>
                                        <Link to="/projects" style={{ textDecoration: 'none' }}><TempButton whileTap={{ scale: 0.95 }}>See All Projects</TempButton></Link>
                                    </motion.div>
                                </FeaturedContentWrapper>
                            </FeaturedProjectCard>
                        </motion.div>
                    </AnimatedSection>
                 </div>
            </ContentSection>

        </motion.div>
    );
};

export default HomePage;