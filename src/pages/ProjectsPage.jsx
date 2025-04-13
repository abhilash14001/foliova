import React, { useState, useEffect, useMemo } from 'react'; // Added useState, useEffect, useMemo
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import ProjectCard from '../components/common/ProjectCard';
import { projects } from '../data/portfolioData';

// --- Animation Variants (Keep the existing ones) ---
const sentenceVariants = {  hidden: { opacity: 1 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.06, delayChildren: i * 0.1 }, }), };
const wordVariants = {  hidden: { opacity: 0, y: 20, transition: { type: 'spring', damping: 12, stiffness: 200 } }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } }, };
const pageVariants = {  initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.6 };

// Corrected card item variants (These define IN animation)
const cardItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 }, // Slightly different entry
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.99] }
    },
    // Add EXIT animation for filtering
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -30, // Exit upwards slightly
        transition: { duration: 0.3, ease: "easeIn" }
    }
};
// --- End Variant Definitions ---


// --- Styled Components ---
const ProjectsContainer = styled(motion.div)`
  padding: 7rem 0 5rem 0; /* More bottom padding */
  max-width: 1200px; /* Slightly wider max-width */
  margin: 0 auto;
  width: 90%;
  min-height: 80vh;
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 2rem; /* Less margin before filters */
  font-size: clamp(2rem, 6vw, 3rem);
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

// --- Filter Controls Container (NEW) ---
const FilterContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 4rem; /* Space between filters and grid */
`;

// --- Filter Button (NEW) ---
const FilterButton = styled(motion.button)`
    padding: 0.6rem 1.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme, $isActive }) => $isActive ? (theme.mode === 'light' ? '#fff' : '#000') : theme.primary};
    background-color: ${({ theme, $isActive }) => $isActive ? theme.primary : 'transparent'};
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 30px; /* Pill shape */
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme, $isActive }) => !$isActive && (theme.mode === 'light' ? theme.primary + '1A' : theme.primary + '30')};
        /* color: ${({ theme }) => theme.primary}; */
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.primary};
        outline-offset: 2px;
    }
`;


const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Slightly larger min */
  gap: 2.5rem;

   @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
  }
`;
// --- End Styled Components ---


// --- ProjectsPage Component ---
const ProjectsPage = () => {
    const pageTitleText = "My Projects";
    const [activeFilter, setActiveFilter] = useState('All'); // State for active filter
    const [filteredProjects, setFilteredProjects] = useState(projects); // State for displayed projects

    // Get unique categories from project data (using useMemo for efficiency)
    const allCategories = useMemo(() => {
        const tags = new Set(['All']); // Start with 'All'
        projects.forEach(project => {
            project.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, []); // Only calculate once

    // Effect to update filteredProjects when activeFilter changes
    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(project => project.tags?.includes(activeFilter))
            );
        }
    }, [activeFilter]);

    return (
        <ProjectsContainer
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Animated Page Title */}
            <PageTitle
                variants={sentenceVariants} initial="hidden" animate="visible" aria-label={pageTitleText}
            >
                {pageTitleText.split(" ").map((word, index) => (
                    <motion.span key={word + "-" + index} style={{ display: 'inline-block', marginRight: '0.25em' }} variants={wordVariants}>
                        {word}
                    </motion.span>
                ))}
            </PageTitle>

            {/* Filter Buttons */}
            <FilterContainer
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }} // Animate filters after title
            >
                {allCategories.map(category => (
                    <FilterButton
                        key={category}
                        $isActive={activeFilter === category}
                        onClick={() => setActiveFilter(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </FilterButton>
                ))}
            </FilterContainer>

            {/* Animated Project Grid */}
            <ProjectsGrid
                
                layout // Enable layout animation
            >
                <AnimatePresence mode="popLayout"> {/* Handle enter/exit animations + layout */}
                    {filteredProjects && filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                           <motion.div
                               key={project.id} // Key is crucial for AnimatePresence
                               variants={cardItemVariants}
                               initial="hidden"
                               animate="visible"
                               exit="exit"
                               layout // Animate layout changes
                               
                           >
                              <ProjectCard project={project} />
                           </motion.div>
                        ))
                     ) : (
                        <motion.p // Animate fallback message
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ gridColumn: '1 / -1', textAlign: 'center' }} // Span full grid width
                        >
                            No projects found matching "{activeFilter}".
                        </motion.p>
                     )}
                </AnimatePresence>
            </ProjectsGrid>

        </ProjectsContainer>
    );
};

export default ProjectsPage;