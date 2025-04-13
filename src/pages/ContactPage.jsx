import React from 'react';
import styled from 'styled-components';
import AnimatedSection from '../components/animations/AnimatedSection';
import { profile } from '../data/portfolioData'; // Import profile data for contact info
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Styled container for the page content
const ContactContainer = styled.div`
  padding: 6rem 0 4rem 0; /* Adjust top padding */
  max-width: 800px;
  margin: 0 auto;
  width: 90%;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr; /* Side-by-side layout on larger screens */
     gap: 4rem;
  }
`;

const ContactInfo = styled(AnimatedSection)`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.primary};
  }
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.secondary};
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;

  svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
    flex-shrink: 0; /* Prevent icon shrinking */
  }

  a {
    color: ${({ theme }) => theme.text};
    word-break: break-word; /* Prevent long emails/links overflowing */
    transition: color 0.3s ease;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const ContactFormWrapper = styled(AnimatedSection)`
   h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled(motion.div)``; // Wrap for potential animation

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => theme.mode === 'light' ? '#ced4da' : '#495057'};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}33`}; /* Subtle focus ring */
  }

  &::placeholder {
      color: ${({ theme }) => theme.secondary};
  }
`;

const StyledTextarea = styled(StyledInput).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 150px;
`;

const SubmitButton = styled(motion.button)`
    padding: 0.8rem 1.8rem;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => (theme.mode === 'light' ? '#fff' : '#000')};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-start; /* Align button to the left */

    &:hover {
        background-color: ${({ theme }) => theme.accent};
        border-color: ${({ theme }) => theme.accent};
        color: ${({ theme }) => theme.mode === 'light' ? '#fff' : '#000'};
        transform: translateY(-3px);
    }

     &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ContactPage = () => {

    // Basic form state (expand with validation later)
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' or 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        console.log("Form Data:", formData); // Log for now

        // --- Replace with actual form submission logic ---
        // Example using fetch (e.g., to Netlify Functions, Formspree, or your backend)
        try {
             // const response = await fetch('/.netlify/functions/submit-form', { // Example endpoint
             //     method: 'POST',
             //     headers: { 'Content-Type': 'application/json' },
             //     body: JSON.stringify(formData),
             // });
             // if (!response.ok) throw new Error('Network response was not ok');
             // const result = await response.json();

            // Simulate submission delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear form

        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
        // --- End of submission logic ---
    };

     // Variants for list items animation
     const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
     };

    return (
        <ContactContainer>
            <AnimatedSection animationType="fadeIn" duration={0.5}>
                <PageTitle>Get In Touch</PageTitle>
            </AnimatedSection>

            <ContactContent>
                <ContactInfo animationType="slideInLeft" duration={0.7} delay={0.2}>
                    <h2>Contact Information</h2>
                    <p>
                        Feel free to reach out via email or connect with me on social platforms.
                        I'm always open to discussing new projects or opportunities.
                    </p>
                    <InfoList
                        as={motion.ul} // Use motion.ul for stagger
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        initial="hidden"
                        animate="visible" // Animate immediately on load
                    >
                        {profile.contact.email && (
                            <InfoItem variants={listItemVariants}>
                                <FaEnvelope />
                                <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                            </InfoItem>
                        )}
                        {profile.contact.linkedin && (
                            <InfoItem variants={listItemVariants}>
                                <FaLinkedin />
                                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                            </InfoItem>
                        )}
                         {profile.contact.github && (
                            <InfoItem variants={listItemVariants}>
                                <FaGithub />
                                <a href={profile.contact.github} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                            </InfoItem>
                        )}
                    </InfoList>
                </ContactInfo>

                <ContactFormWrapper animationType="slideInRight" duration={0.7} delay={0.4}>
                    <h2>Send Me a Message</h2>
                    <StyledForm onSubmit={handleSubmit}>
                        <InputGroup>
                            <StyledInput
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </InputGroup>
                         <InputGroup>
                            <StyledInput
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </InputGroup>
                        <InputGroup>
                            <StyledTextarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </InputGroup>

                         {submitStatus === 'success' && <p style={{ color: 'green' }}>Message sent successfully!</p>}
                        {submitStatus === 'error' && <p style={{ color: 'red' }}>Failed to send message. Please try again.</p>}

                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </SubmitButton>
                    </StyledForm>
                </ContactFormWrapper>
            </ContactContent>
        </ContactContainer>
    );
};

export default ContactPage;