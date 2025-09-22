"use client";

import { motion, type Variants } from "motion/react";
import type React from "react";

type FadeInWithStaggerProps = {
  children: React.ReactNode;
  className?: string;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const FadeInWithStagger = ({ children, className }: FadeInWithStaggerProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWithStagger;
