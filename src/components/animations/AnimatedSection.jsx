import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({ children, animationType = 'fadeUp', delay = 0, duration = 0.6, amount = 0.3, once = true, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, amount: amount }); // Trigger animation once when 'amount' visible

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideInLeft: {
       hidden: { opacity: 0, x: -100 },
       visible: { opacity: 1, x: 0 }
    },
     slideInRight: {
       hidden: { opacity: 0, x: 100 },
       visible: { opacity: 1, x: 0 }
    }
    // Add more animation types as needed
  };

  const selectedVariant = variants[animationType] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      {...props} // Pass any other motion props
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;