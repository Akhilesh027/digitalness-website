import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import BackToTop from './BackToTop';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </>
  );
}
