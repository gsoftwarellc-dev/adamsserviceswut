import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { business } from '../data/site';
import logo from '../assets/logo.png';
import './Header.css';

/**
 * Nav items either scroll to a section on the home page (`sectionId`)
 * or route to a standalone page (`path`).
 */
const navItems = [
  { label: 'Home', sectionId: 'top' },
  { label: 'Services', sectionId: 'services' },
  { label: 'About Us', sectionId: 'about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'All Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  /* Compact the header once the page has scrolled. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Highlight the nav item for whichever section is currently in view. */
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const ids = ['top', 'services', 'about'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  /* Lock body scroll while the mobile drawer is open. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /**
   * Section links work from any page: if we are not on the home page,
   * route there first and let the home page scroll to the requested
   * section once it has mounted.
   */
  const handleSectionClick = useCallback(
    (sectionId: string) => {
      setMenuOpen(false);

      if (isHome) {
        scrollToSection(sectionId);
      } else {
        navigate('/', { state: { scrollTo: sectionId } });
      }
    },
    [isHome, navigate, scrollToSection]
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <Link
            to="/"
            className="header__brand"
            onClick={() => isHome && scrollToSection('top')}
            aria-label={`${business.name} — home`}
          >
            <img
              src={logo}
              alt=""
              className="header__logo"
              width={52}
              height={52}
            />
            <span className="header__brand-text">
              <span className="header__brand-name">Adams Services</span>
              <span className="header__brand-sub">{business.tagline}</span>
            </span>
          </Link>

          <nav className="header__nav" aria-label="Main navigation">
            {navItems.map((item) =>
              'sectionId' in item ? (
                <button
                  key={item.label}
                  type="button"
                  className={`header__link ${
                    isHome && activeSection === item.sectionId
                      ? 'header__link--active'
                      : ''
                  }`}
                  onClick={() => handleSectionClick(item.sectionId)}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`header__link ${
                    location.pathname === item.path
                      ? 'header__link--active'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="header__actions">
            <a
              href={business.phoneHref}
              className="header__phone"
              aria-label={`Call ${business.phone}`}
            >
              <Phone size={17} strokeWidth={2.2} />
              <span>{business.phone}</span>
            </a>

            <button
              type="button"
              className="header__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`drawer ${menuOpen ? 'drawer--open' : ''}`}
        /* inert keeps the off-screen drawer out of the tab order and the
           accessibility tree without cancelling its slide transition. */
        inert={!menuOpen}
        aria-hidden={!menuOpen}
      >
        <nav className="drawer__nav" aria-label="Mobile navigation">
          {navItems.map((item) =>
            'sectionId' in item ? (
              <button
                key={item.label}
                type="button"
                className="drawer__link"
                onClick={() => handleSectionClick(item.sectionId)}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className="drawer__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <a href={business.phoneHref} className="btn btn--leaf drawer__cta">
          <Phone size={18} strokeWidth={2.2} />
          {business.phone}
        </a>

        <p className="drawer__note">
          Serving {business.serviceArea} · Free estimates
        </p>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="drawer__scrim"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          tabIndex={-1}
        />
      )}
    </>
  );
}
