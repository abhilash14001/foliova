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
    position: absolute;
    top: calc(100% + 1rem);
    left: 5%;
    right: 5%;
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.75rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.cardBg};
    box-shadow: ${({ theme }) => theme.cardShadow};

    li {
      width: 100%;
    }

    a {
      display: block;
      padding: 0.85rem 1rem;
    }

    li:last-child {
      display: flex;
      justify-content: center;
      padding: 0.65rem;
      border-top: 1px solid ${({ theme }) => theme.mode === 'light' ? '#e0e0e0' : '#333'};
    }
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
    display: none;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.mode === 'light' ? '#d7dce1' : '#444'};
    border-radius: 8px;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.primary};
      outline-offset: 2px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: inline-flex;
    }
`;


const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

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
                Abhilash R.</LogoLink>
                <NavLinks $isOpen={menuOpen}>
                    <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                    <li><NavLink to="/projects" onClick={closeMenu}>Projects</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
                    <li><ThemeToggle /></li>
                </NavLinks>
                <MobileMenuToggle
                    type="button"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((isOpen) => !isOpen)}
                >
                    {menuOpen ? '×' : '☰'}
                </MobileMenuToggle>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;