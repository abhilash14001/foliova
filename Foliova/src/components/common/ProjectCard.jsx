import React from 'react';
import styled, { css } from 'styled-components'; // Import css helper
import { motion } from 'framer-motion';
import { FaLink, FaGithub } from 'react-icons/fa';

// --- Card Container (Should already exist) ---
const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%; /* Ensure cards in grid have same height */

  &:hover {
    transform: translateY(-8px); /* More pronounced lift */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
  }
`;

// --- HERE IS THE ImageWrapper ---
const ImageWrapper = styled.div`
    width: 100%;
    height: 200px; /* Or adjust as needed */
    overflow: hidden; /* Crucial to contain the image zoom */

    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Makes the image cover the area without distortion */
        transition: transform 0.4s ease; /* Smooth zoom transition */
    }

    /* Apply zoom effect when the CardContainer is hovered */
    ${CardContainer}:hover & img {
        transform: scale(1.05); /* Zoom image slightly */
    }
`;
// --- END ImageWrapper ---


// --- Card Content (Should already exist) ---
const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// --- Card Title (Should already exist) ---
const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.primary};
  font-size: 1.3rem;
`;

// --- Card Description (Should already exist) ---
const CardDescription = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1rem;
  flex-grow: 1;
  color: ${({ theme }) => theme.secondary};
`;

// --- Tags Container (Should already exist) ---
const TagsContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

// --- Tag (Should already exist) ---
const Tag = styled.span`
  background-color: ${({ theme }) => theme.mode === 'light' ? theme.primary + '20' : theme.primary + '30'};
  color: ${({ theme }) => theme.primary};
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;


// --- Card Links Container (Should already exist) ---
const CardLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;


// --- IconLink (Updated 3D version from previous step) ---
const IconLink = styled.a`
  /* ... (3D button styles from previous response) ... */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: #ffffff;
  font-size: 1.3rem;
  width: 40px;
  height: 40px;
  z-index: 1;

  ${({ theme, $isPrimary }) => {
    const baseColor = $isPrimary ? theme.primary : theme.secondary;
    let darkEdgeColor;
    if ($isPrimary) {
        darkEdgeColor = theme.mode === 'light' ? '#0056b3' : '#0a8ea0';
    } else {
        darkEdgeColor = theme.mode === 'light' ? '#495057' : '#868e96';
    }

    return css`
      background-color: ${baseColor};
      box-shadow: 0px 2px 0px 0px ${darkEdgeColor}, 0px 4px 6px 0px rgba(0, 0, 0, 0.15);
      transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 3px 0px 0px ${darkEdgeColor}, 0px 6px 8px 0px rgba(0, 0, 0, 0.2);
      }
      &:active {
        transform: translateY(1px);
        box-shadow: 0px 1px 0px 0px ${darkEdgeColor}, 0px 2px 3px 0px rgba(0, 0, 0, 0.15);
      }
      &:focus-visible {
         outline: 2px solid ${baseColor};
         outline-offset: 2px;
       }
    `;
  }}
  &:hover, &:active {
      color: #ffffff;
      text-decoration: none;
  }
`;


// --- ProjectCard Component ---
const ProjectCard = ({ project }) => {
  const { title, description, imageUrl, tags, liveUrl, repoUrl } = project;

  return (
    <CardContainer>
      {imageUrl && (
          // ImageWrapper is used here
          <ImageWrapper>
             <img src={imageUrl} alt={title} loading="lazy" />
          </ImageWrapper>
      )}
      <CardContent>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {tags && tags.length > 0 && (
            <TagsContainer>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}
        </div>
        <CardLinks>
          {liveUrl && liveUrl !== '#' && (
            <IconLink $isPrimary href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} Live Demo`} title="Live Demo">
              <FaLink />
            </IconLink>
          )}
          {repoUrl && repoUrl !== '#' && (
            <IconLink href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub Repository`} title="GitHub Repository">
              <FaGithub />
            </IconLink>
          )}
        </CardLinks>
      </CardContent>
    </CardContainer>
  );
};

export default ProjectCard;