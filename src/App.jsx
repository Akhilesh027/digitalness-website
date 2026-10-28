import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceCategory from './pages/ServiceCategory';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import FAQs from './pages/FAQs';
import CaseStudies from './pages/CaseStudies';
import Testimonials from './pages/Testimonials';
import { Blogs, BlogDetail } from './pages/Blogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services/:category" element={<ServiceCategory />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/testimonials" element={<Testimonials />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/terms" element={<TermsConditions />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
