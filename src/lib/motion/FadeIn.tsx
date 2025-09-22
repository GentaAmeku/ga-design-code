"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FadeIn = ({ children, className }: FadeInProps) => {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default FadeIn;
