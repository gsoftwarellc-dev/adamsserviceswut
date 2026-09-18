import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, Star } from 'lucide-react';
import { business, services } from '../data/site';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  /** Same behavior as the header: route home first if needed, then scroll. */
  const goToSection = (sectionId: string) => {
    if (isHome) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__brand-col">
          <div className="footer__brand">
            <img
              src={logo}
              alt=""
              className="footer__logo"
              width={64}
              height={64}
            />
            <div>
              <p className="footer__name">{business.name}</p>
              <p className="footer__tagline">{business.tagline}</p>
            </div>
          </div>

          <p className="footer__blurb">
            Family-owned since {business.established}, providing a complete
            range of outdoor services across {business.serviceArea}.
          </p>

          <a
            href={business.googleReviewsUrl}
            className="footer__rating"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer__stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>
              {business.rating.toFixed(1)} · {business.reviewCount} Google
              reviews
            </span>
          </a>
        </div>

        {/* Section links */}
        <nav className="footer__col" aria-label="Site sections">
          <h3 className="footer__heading">Explore</h3>
          <button
            type="button"
            className="footer__link"
            onClick={() => goToSection('top')}
          >
            Introduction
          </button>
          <button
            type="button"
            className="footer__link"
            onClick={() => goToSection('services')}
          >
            Services
          </button>
          <button
            type="button"
            className="footer__link"
            onClick={() => goToSection('about')}
          >
            About Us
          </button>
          <Link to="/gallery" className="footer__link">
            Gallery
          </Link>
          <Link to="/services" className="footer__link">
            All Services
          </Link>
        </nav>

        {/* Service links */}
        <nav className="footer__col" aria-label="Services">
          <h3 className="footer__heading">What We Do</h3>
          {services.slice(0, 6).map((service) => (
            <Link
              key={service.slug}
              to={`/services#${service.slug}`}
              className="footer__link"
            >
              {service.title}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="footer__col">
          <h3 className="footer__heading">Get In Touch</h3>

          <a href={business.phoneHref} className="footer__contact">
            <Phone size={17} strokeWidth={2.1} />
            <span>{business.phone}</span>
          </a>

          <p className="footer__contact">
            <MapPin size={17} strokeWidth={2.1} />
            <span>{business.serviceArea}</span>
          </p>

          <div className="footer__contact footer__contact--hours">
            <Clock size={17} strokeWidth={2.1} />
            <span>
              {business.hours.map((h) => (
                <span key={h.days} className="footer__hours-row">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </span>
              ))}
            </span>
          </div>

          <a href={business.phoneHref} className="btn btn--leaf footer__cta">
            Request a Free Estimate
          </a>
        </div>
      </div>

      <div className="footer__bar">
        <div className="footer__bar-inner container">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="footer__bar-meta">
            Licensed &amp; insured · Serving {business.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
