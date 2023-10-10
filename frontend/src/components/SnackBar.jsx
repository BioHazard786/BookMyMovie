import { useSnackBar } from "../utils/store";
import { motion } from "framer-motion";
import "./SnackBar.css";

/**
 * SnackBar component for notification
 */
const SnackBar = () => {
  /**
   * Snackbar state store
   */
  const [status, snackBarMessage] = useSnackBar((snackBarStore) => [
    snackBarStore.status,
    snackBarStore.snackBarMessage,
  ]);

  // Animation variants for snackbar
  const snackBarAnimation = {
    hidden: { bottom: "-10%", opacity: 0 },
    visible: {
      bottom: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={snackBarAnimation}
      initial="hidden"
      animate={status ? "visible" : "hidden"}
      className="snackbar-container"
    >
      <p className="snackbar-message">{snackBarMessage}</p>
    </motion.div>
  );
};

export default SnackBar;
