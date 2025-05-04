import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle'; // Create this component
import { motion } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed; /* Or sticky */
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  background: ${({ theme }) => theme.headerBg};
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  box-shadow: ${({ theme, $scrolled }) => $scrolled ? theme.headerShadow : 'none'};
  z-index: 1000;
  transition: background ${({ theme }) => theme.transitionSpeed} ease, box-shadow 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* Basic example: Hide on small screens, implement burger menu later */
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  /* Simple underline animation */
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

// Add a Mobile Menu Toggle button here for responsiveness
const MobileMenuToggle = styled.button`
    display: none; // Show only on small screens
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: block;
    }
`;


const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Framer Motion variants for header animation
    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <HeaderContainer
            $scrolled={scrolled} // Pass scrolled state as transient prop
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <Nav>
                <LogoLink to="/">
                Foliova</LogoLink>
                <NavLinks>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/projects">Projects</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><ThemeToggle /></li>
                </NavLinks>
                {/* Add Mobile Menu Toggle functionality later */}
                 <MobileMenuToggle>☰</MobileMenuToggle>
                 {/* Add ThemeToggle also for mobile if needed */}
            </Nav>
        </HeaderContainer>
    );
};

export default Header;