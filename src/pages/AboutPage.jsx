import React from 'react';
import styled from 'styled-components';
import AnimatedSection from '../components/animations/AnimatedSection';
import { profile, skills } from '../data/portfolioData'; // Import data
import { motion } from 'framer-motion';

// Styled container for the page content
const AboutContainer = styled.div`
  padding: 6rem 0 4rem 0; /* Adjust top padding for fixed header */
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
`;

const ProfileSection = styled(AnimatedSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: row;
      text-align: left;
      gap: 3rem;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 5px solid ${({ theme }) => theme.primary};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: 0;
      width: 220px; /* Larger on desktop */
      height: 220px;
  }
`;

const ProfileText = styled.div`
  h2 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.text}; /* Use text color for name */
  }
  h3 {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.secondary};
      font-weight: 400;
      margin-bottom: 1rem;
  }
  p {
    line-height: 1.7;
  }
`;

const SkillsSection = styled(AnimatedSection)`
  margin-bottom: 4rem;

  h2 {
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: transform 0.3s ease;

  &:hover {
      transform: scale(1.05);
  }

  h4 {
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.primary};
      font-size: 1.1rem;
  }

  /* Basic level indicator (optional) */
  .level-bar {
      height: 8px;
      background-color: ${({ theme }) => theme.mode === 'light' ? '#e0e0e0' : '#444'};
      border-radius: 4px;
      overflow: hidden;
      margin-top: 0.8rem;
  }

  .level-fill {
      height: 100%;
      background-color: ${({ theme }) => theme.accent};
      border-radius: 4px;
  }
`;

const AboutPage = () => {

    // Animation variants for skill items (used if not using StaggerWrap)
    const skillItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <AboutContainer>
            <AnimatedSection animationType="fadeIn" duration={0.5}>
                <PageTitle>About Me</PageTitle>
            </AnimatedSection>

            <ProfileSection animationType="fadeUp" duration={0.8}>
                {/* Add a placeholder or actual image path */}
                <ProfileImage
                    src="/images/profile.jpg" // Replace with your actual image path
                    alt={profile.name}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 120 }}
                />
                <ProfileText>
                    <h2>{profile.name}</h2>
                    <h3>{profile.title}</h3>
                    <p>{profile.bio}</p>
                    {/* Optional: Add resume download button */}
                </ProfileText>
            </ProfileSection>

            <SkillsSection animationType="fadeIn" duration={0.5}>
                <h2>My Skills</h2>
                {/* Using StaggerWrap for the skills grid */}
                <SkillsGrid
                    as={motion.div} // Use motion.div provided by StaggerWrap
                    variants={{ // Parent Variants for StaggerWrap
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    whileInView="visible" // Trigger stagger when grid scrolls into view
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {skills.map((skill, index) => (
                         <SkillItem
                            key={index}
                            variants={skillItemVariants} // Child Variants for StaggerWrap
                         >
                            <h4>{skill.name}</h4>
                            {skill.level && ( // Display level bar if level exists
                                <div className="level-bar">
                                    <motion.div
                                        className="level-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true, amount: 0.8 }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }} // Add delay based on index
                                    />
                                </div>
                            )}
                        </SkillItem>
                    ))}
                </SkillsGrid>
            </SkillsSection>

            {/* Add other sections like Experience, Education using AnimatedSection */}

        </AboutContainer>
    );
};

export default AboutPage;