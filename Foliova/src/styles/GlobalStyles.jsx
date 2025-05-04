import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Import Fonts (Example using Google Fonts) */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap');

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontFamily};
    transition: background ${({ theme }) => theme.transitionSpeed} ease-in-out, color ${({ theme }) => theme.transitionSpeed} ease-in-out;
    line-height: 1.6;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitionSpeed} ease;

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Basic container for centering content */
  .container {
      width: 90%;
      max-width: 1100px; /* Adjust max-width as needed */
      margin: 0 auto;
  }

  /* Utility classes (optional but helpful) */
  .text-center { text-align: center; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Scrollbar styling (Optional, use vendor prefixes) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.body};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }
`;