import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.cardBg}; /* Use a slightly different bg */
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  margin-top: 4rem; /* Add space above footer */
  border-top: 1px solid ${({ theme }) => (theme.mode === 'light' ? '#e0e0e0' : '#333')};
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

// Add social links component here later

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        {/* Add Social Links Here */}
        <FooterText>
          © {new Date().getFullYear()} Foliova. All Rights Reserved.
        </FooterText>
        {/* Optional: Link back to ThemeForest or your site */}
      </div>
    </FooterContainer>
  );
};

export default Footer;