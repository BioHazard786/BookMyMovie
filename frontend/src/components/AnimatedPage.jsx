import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const childAnimations = {
  initial: {
    opacity: 0,
    y: "70px",
  },
  animate: {
    opacity: 1,
    y: "0px",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedChild = ({ children }) => {
  return (
    <motion.div variants={childAnimations} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
};

export { AnimatedPage, AnimatedChild, childAnimations };
