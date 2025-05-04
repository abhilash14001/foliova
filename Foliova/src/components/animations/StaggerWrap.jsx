import React from 'react';
import { motion } from 'framer-motion';

const StaggerWrap = ({ children, staggerChildren = 0.1, delayChildren = 0, parentVariants, childVariants, ...props }) => {

  const defaultParentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };

  const defaultChildVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={parentVariants || defaultParentVariants}
      initial="hidden"
      animate="visible" // Or trigger with useInView like AnimatedSection
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants || defaultChildVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerWrap;