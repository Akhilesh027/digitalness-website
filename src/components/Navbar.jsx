import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Camera,
  ChevronDown,
  CircleHelp,
  Code2,
  FileText,
  Grid2X2,
  Images,
  Lightbulb,
  Megaphone,
  Menu,
  Newspaper,
  Palette,
  PhoneCall,
  PlugZap,
  Quote,
  RadioTower,
  Sparkles,
  UsersRound,
  Video,
  Workflow,
  Wrench,
  X
} from 'lucide-react';

import { servicesByCategory } from '../data/services';

const menuGroups = [
  {
    label: 'Digital Marketing',
    dataKey: 'Digital Marketing',
    href: '/services/digital-marketing',
    icon: Megaphone
  },
  {
    label: 'Web Development',
    dataKey: 'Web Development',
    href: '/services/web-development',
    icon: Code2
  },
  {
    label: 'Branding',
    dataKey: 'Branding',
    href: '/services/branding',
    icon: Palette
  }
];

const moreLinks = [
  {
    label: 'About Digitalness',
    href: '/about',
    icon: Building2
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    icon: Images
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
    icon: FileText
  },
  {
    label: 'Blogs',
    href: '/blogs',
    icon: Newspaper
  },
  {
    label: 'Free Tools',
    href: '/tools',
    icon: Wrench
  },
  {
    label: 'Careers',
    href: '/careers',
    icon: BriefcaseBusiness
  },
  {
    label: 'Testimonials',
    href: '/testimonials',
    icon: Quote
  },
  {
    label: 'FAQs',
    href: '/faqs',
    icon: CircleHelp
  }
];


/* ============================================================
   MORE MENU ICONS
   Matches service names returned by servicesByCategory.
   Wrench is used as a safe fallback for future services.
============================================================ */

const getOtherServiceIcon = (serviceName = '') => {
  const name = serviceName.toLowerCase();

  if (name.includes('ivr')) {
    return PhoneCall;
  }

  if (name.includes('crm')) {
    return UsersRound;
  }

  if (name.includes('integration')) {
    return PlugZap;
  }

  if (name.includes('photography')) {
    return Camera;
  }

  if (name.includes('videography')) {
    return Video;
  }

  if (name.includes('drone')) {
    return RadioTower;
  }

  if (name.includes('traditional marketing')) {
    return Megaphone;
  }

  if (name.includes('business solution')) {
    return Workflow;
  }

  if (name.includes('consulting')) {
    return Lightbulb;
  }

  return Wrench;
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navRef = useRef(null);
  const location = useLocation();

  const otherServices =
    servicesByCategory?.['Other Services'] || [];

  const closeAll = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((current) =>
      current === name ? null : name
    );
  };

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  useEffect(() => {
    const outsideClick = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    const escapeKey = (event) => {
      if (event.key === 'Escape') {
        closeAll();
      }
    };

    document.addEventListener(
      'mousedown',
      outsideClick
    );

    document.addEventListener(
      'keydown',
      escapeKey
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        outsideClick
      );

      document.removeEventListener(
        'keydown',
        escapeKey
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="infosys-navbar">
        <div
          className="infosys-navbar-inner"
          ref={navRef}
        >
          {/* LEFT SIDE */}
          <div className="infosys-navbar-left">

            <button
              type="button"
              className="infosys-menu-circle"
              onClick={() =>
                setMobileOpen((current) => !current)
              }
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={27} />
              ) : (
                <Menu size={27} />
              )}
            </button>

            {/* DIGITALNESS LOGO ONLY */}
            <Link
              to="/"
              className="infosys-brand"
              onClick={closeAll}
              aria-label="Digitalness home"
            >
              <img
                src="/digitalness-logo.png"
                alt="Digitalness"
                className="infosys-brand-logo"
              />
            </Link>

          </div>

          {/* CENTER NAVIGATION */}
          <nav className="infosys-nav-pill">

            {menuGroups.map((group) => {
              const services =
                servicesByCategory?.[
                  group.dataKey
                ] || [];

              const isOpen =
                activeDropdown ===
                group.dataKey;

              const Icon = group.icon;

              return (
                <div
                  className="infosys-nav-group"
                  key={group.dataKey}
                  onMouseEnter={() =>
                    setActiveDropdown(
                      group.dataKey
                    )
                  }
                  onMouseLeave={() =>
                    setActiveDropdown(null)
                  }
                >
                  <button
                    type="button"
                    className="infosys-nav-link"
                    onClick={() =>
                      toggleDropdown(
                        group.dataKey
                      )
                    }
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span>{group.label}</span>

                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                      className={
                        isOpen
                          ? 'infosys-chevron open'
                          : 'infosys-chevron'
                      }
                    />
                  </button>

                  <div
                    className={
                      isOpen
                        ? 'infosys-dropdown open'
                        : 'infosys-dropdown'
                    }
                  >
                    <div className="infosys-dropdown-head">

                      <div
                        className="infosys-dropdown-title"
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />

                        <h3>
                          {group.label}
                        </h3>
                      </div>

                      <Link
                        to={group.href}
                        onClick={closeAll}
                      >
                        View all

                        <ArrowUpRight
                          size={15}
                        />
                      </Link>

                    </div>

                    <div className="infosys-dropdown-grid">

                      {services.map(
                        (service) => (
                          <Link
                            key={
                              service.slug
                            }
                            to={`/service/${service.slug}`}
                            onClick={
                              closeAll
                            }
                          >
                            <span>
                              {
                                service.name
                              }
                            </span>

                            <ArrowUpRight
                              size={14}
                            />
                          </Link>
                        )
                      )}

                    </div>
                  </div>
                </div>
              );
            })}

            {/* MORE */}
            <div
              className="infosys-nav-group"
              onMouseEnter={() =>
                setActiveDropdown('More')
              }
              onMouseLeave={() =>
                setActiveDropdown(null)
              }
            >
              <button
                type="button"
                className="infosys-nav-link"
                onClick={() =>
                  toggleDropdown('More')
                }
              >
                <Grid2X2
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>More</span>

                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={
                    activeDropdown === 'More'
                      ? 'infosys-chevron open'
                      : 'infosys-chevron'
                  }
                />
              </button>

              <div
                className={
                  activeDropdown === 'More'
                    ? 'infosys-dropdown infosys-more-dropdown open'
                    : 'infosys-dropdown infosys-more-dropdown'
                }
              >
                <div className="infosys-more-column">

                  <span className="infosys-menu-title">
                    Other Services
                  </span>

                  {otherServices.map(
                    (service) => {
                      const ServiceIcon =
                        getOtherServiceIcon(
                          service.name
                        );

                      return (
                        <Link
                          key={service.slug}
                          to={`/service/${service.slug}`}
                          onClick={closeAll}
                          className="infosys-more-item"
                        >
                          <span className="infosys-more-item-left">
                            <span className="infosys-more-item-icon">
                              <ServiceIcon
                                size={17}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            </span>

                            <span>
                              {service.name}
                            </span>
                          </span>

                          <ArrowUpRight
                            size={14}
                            className="infosys-more-item-arrow"
                          />
                        </Link>
                      );
                    }
                  )}

                </div>

                <div className="infosys-more-column">

                  <span className="infosys-menu-title">
                    Digitalness
                  </span>

                  {moreLinks.map(
                    (item) => {
                      const ItemIcon =
                        item.icon;

                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={closeAll}
                          className="infosys-more-item"
                        >
                          <span className="infosys-more-item-left">
                            <span className="infosys-more-item-icon">
                              <ItemIcon
                                size={17}
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                            </span>

                            <span>
                              {item.label}
                            </span>
                          </span>

                          <ArrowUpRight
                            size={14}
                            className="infosys-more-item-arrow"
                          />
                        </Link>
                      );
                    }
                  )}

                </div>
              </div>
            </div>

          </nav>

          {/* RIGHT CTA */}
          <Link
            to="/contact"
            className="infosys-talk-btn"
            onClick={closeAll}
          >
            <span className="infosys-talk-icon">
              <Sparkles size={19} />
            </span>

            <span>
              Let's Talk
            </span>
          </Link>

        </div>
      </header>

      {/* FULL SCREEN MENU */}
      <div
        className={
          mobileOpen
            ? 'infosys-full-menu open'
            : 'infosys-full-menu'
        }
      >
        <div className="infosys-full-menu-inner">

          <div className="infosys-full-title">
            <small>
              DIGITALNESS
            </small>

            <h2>
              Navigate your next.
            </h2>
          </div>

          <div className="infosys-full-grid">

            {menuGroups.map((group) => {
              const services =
                servicesByCategory?.[
                  group.dataKey
                ] || [];

              const Icon = group.icon;

              return (
                <div
                  key={group.dataKey}
                  className="infosys-full-column"
                >
                  <Link
                    to={group.href}
                    className="infosys-full-heading"
                    onClick={closeAll}
                  >
                    <span
                      className="infosys-full-heading-label"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      {group.label}
                    </span>

                    <ArrowUpRight
                      size={18}
                    />
                  </Link>

                  {services.map(
                    (service) => (
                      <Link
                        key={service.slug}
                        to={`/service/${service.slug}`}
                        onClick={closeAll}
                      >
                        {service.name}
                      </Link>
                    )
                  )}

                </div>
              );
            })}

            <div className="infosys-full-column">

              <Link
                to="/services/other-services"
                className="infosys-full-heading"
                onClick={closeAll}
              >
                <span
                  className="infosys-full-heading-label"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Grid2X2
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Other Services
                </span>

                <ArrowUpRight
                  size={18}
                />
              </Link>

              {otherServices.map(
                (service) => {
                  const ServiceIcon =
                    getOtherServiceIcon(
                      service.name
                    );

                  return (
                    <Link
                      key={service.slug}
                      to={`/service/${service.slug}`}
                      onClick={closeAll}
                      className="infosys-full-icon-link"
                    >
                      <ServiceIcon
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      <span>
                        {service.name}
                      </span>
                    </Link>
                  );
                }
              )}

            </div>

          </div>

          <div className="infosys-full-bottom">

            <div>
              {moreLinks.map(
                (link) => {
                  const LinkIcon =
                    link.icon;

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={closeAll}
                      className="infosys-full-bottom-link"
                    >
                      <LinkIcon
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      <span>
                        {link.label}
                      </span>
                    </Link>
                  );
                }
              )}
            </div>

            <Link
              to="/contact"
              className="infosys-full-contact"
              onClick={closeAll}
            >
              Start a project
              <ArrowUpRight size={21} />
            </Link>

          </div>

        </div>
      </div>
    </>
  );
}