import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  Star,
  ShieldCheck,
  Users,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';
import { business, services, valueProps } from '../data/site';
import Reveal from '../components/Reveal';
import heroImage from '../assets/gallery/paver-walkway-wide.webp';
import aboutImage from '../assets/gallery/rock-bed-feature.webp';
import './Home.css';

const trustStats = [
  { icon: Star, value: '5.0', label: 'Google rating' },
  { icon: Users, value: '19+', label: 'Happy clients' },
  { icon: CalendarCheck, value: '2023', label: 'Established' },
  { icon: ShieldCheck, value: '100%', label: 'Satisfaction focused' },
];

export default function Home() {
  const location = useLocation();

  /**
   * When another page routes here asking for a section (via the header or
   * footer links), scroll to it once this page has painted.
   */
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;

    // rAF lets the layout settle before we measure scroll positions.
    const raf = requestAnimationFrame(() => {
      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Clear state so a refresh does not re-trigger the jump.
      window.history.replaceState({}, '');
    });

    return () => cancelAnimationFrame(raf);
  }, [location.state]);

  const coreServices = services.filter((s) => s.season === 'core');
  const seasonalServices = services.filter((s) => s.season === 'seasonal');

  return (
    <>
      {/* ============================================
          1. INTRODUCTION
          ============================================ */}
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <img
            src={heroImage}
            alt="Paver walkway bordered by decorative gravel beds installed by Adams Services"
            fetchPriority="high"
            width={1360}
            height={849}
          />
          <div className="hero__scrim" />
        </div>

        <div className="hero__content container">
          <div className="hero__badge">
            <Sparkles size={15} strokeWidth={2.2} />
            Family owned &amp; operated since {business.established}
          </div>

          <h1 id="hero-title" className="hero__title">
            Outdoor spaces
            <br />
            <span className="hero__title-accent">built to last.</span>
          </h1>

          <p className="hero__lede">
            Landscaping, rock work, sprinklers, and year-round property care
            across {business.serviceArea}. One trusted crew for everything
            outside your front door.
          </p>

          <div className="hero__actions">
            <a href={business.phoneHref} className="btn btn--leaf hero__cta">
              <Phone size={18} strokeWidth={2.2} />
              Call {business.phone}
            </a>
            <Link to="/gallery" className="btn btn--glass">
              View Our Work
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </div>

          <div className="hero__proof">
            <span className="hero__stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>
              <strong>{business.rating.toFixed(1)}</strong> from{' '}
              {business.reviewCount} Google reviews
            </span>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="stats" aria-label="Company highlights">
        <div className="stats__inner container">
          {trustStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07} className="stat">
              <stat.icon
                size={22}
                strokeWidth={2}
                className="stat__icon"
                aria-hidden="true"
              />
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================
          2. SERVICES
          ============================================ */}
      <section
        id="services"
        className="section services-section"
        aria-labelledby="services-title"
      >
        <div className="container">
          <Reveal className="services__head">
            <span className="eyebrow">What We Do</span>
            <h2 id="services-title" className="section-title">
              A complete suite of outdoor solutions
            </h2>
            <p className="section-lede">
              From the first shovel of dirt to the last string of Christmas
              lights, Adams Services keeps your property sharp in every season
              — so you only need one number on file.
            </p>
          </Reveal>

          <div className="services__grid">
            {coreServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <Link
                  to={`/services#${service.slug}`}
                  className="service-card"
                >
                  <span className="service-card__icon" aria-hidden="true">
                    <service.icon size={26} strokeWidth={1.9} />
                  </span>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__body">{service.summary}</p>
                  <span className="service-card__more">
                    Learn more
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Seasonal band */}
          <Reveal className="seasonal">
            <div className="seasonal__head">
              <div>
                <span className="eyebrow eyebrow--light">
                  Winter &amp; Seasonal
                </span>
                <h3 className="seasonal__title">
                  We do not disappear when it gets cold
                </h3>
              </div>
              <p className="seasonal__lede">
                Snow, holiday lighting, gutters, and haul-away — booked early
                and handled on schedule.
              </p>
            </div>

            <div className="seasonal__grid">
              {seasonalServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services#${service.slug}`}
                  className="seasonal-card"
                >
                  <span className="seasonal-card__icon" aria-hidden="true">
                    <service.icon size={22} strokeWidth={2} />
                  </span>
                  <span className="seasonal-card__title">{service.title}</span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="services__foot">
            <Link to="/services" className="btn btn--primary">
              See full service details
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          3. ABOUT US
          ============================================ */}
      <section
        id="about"
        className="section section--tint about"
        aria-labelledby="about-title"
      >
        <div className="container about__inner">
          <Reveal className="about__media">
            <img
              src={aboutImage}
              alt="Decorative rock feature bed with ornamental grasses and concrete curbing"
              loading="lazy"
              width={1360}
              height={1020}
            />
            <div className="about__media-badge">
              <span className="about__media-year">
                {business.established}
              </span>
              <span className="about__media-text">
                Family owned
                <br />
                &amp; operated
              </span>
            </div>
          </Reveal>

          <div className="about__content">
            <Reveal>
              <span className="eyebrow">About Us</span>
              <h2 id="about-title" className="section-title">
                Your single source for the whole property
              </h2>
              <p className="about__body">
                Established in {business.established},{' '}
                <strong>{business.name}</strong> is a family-owned business
                providing a comprehensive suite of outdoor solutions. From
                expert lawn care and professional landscape design to the
                installation and repair of sprinkler systems, we ensure every
                outdoor space is beautifully maintained.
              </p>
              <p className="about__body">
                We also offer a full range of services including decorative
                mulch and rock installation, paver installation, and efficient
                junk removal — making us a single source for all your
                property&rsquo;s needs.
              </p>
            </Reveal>

            <div className="about__props">
              {valueProps.map((prop, i) => (
                <Reveal key={prop.title} delay={i * 0.07} className="prop">
                  <h3 className="prop__title">{prop.title}</h3>
                  <p className="prop__body">{prop.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="about__actions">
              <a href={business.phoneHref} className="btn btn--primary">
                <Phone size={18} strokeWidth={2.2} />
                Talk to us today
              </a>
              <Link to="/gallery" className="btn btn--ghost">
                Browse the gallery
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="cta" aria-labelledby="cta-title">
        <div className="container cta__inner">
          <Reveal>
            <h2 id="cta-title" className="cta__title">
              Ready to love your yard again?
            </h2>
            <p className="cta__lede">
              Free, no-pressure estimates across {business.serviceArea}. Tell
              us what you have in mind and we will tell you exactly what it
              takes.
            </p>
            <div className="cta__actions">
              <a href={business.phoneHref} className="btn btn--leaf">
                <Phone size={18} strokeWidth={2.2} />
                {business.phone}
              </a>
              <Link to="/services" className="btn btn--glass">
                Explore services
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
