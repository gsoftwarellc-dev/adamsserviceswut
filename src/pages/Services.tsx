import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Check,
  ArrowRight,
  ChevronRight,
  CalendarCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { business, services, type Service } from '../data/site';
import bandImage from '../assets/gallery/boulder-retaining.webp';
import Reveal from '../components/Reveal';
import './Services.css';

/**
 * One alternating service block. Services without a photo of their own get
 * an icon panel instead of a borrowed image from an unrelated job.
 */
function ServiceBlock({ service, flip }: { service: Service; flip: boolean }) {
  return (
    <article
      id={service.slug}
      className={`svc ${flip ? 'svc--flip' : ''}`}
    >
      <Reveal className="svc__media">
        {service.image ? (
          <img
            src={service.image}
            alt={`${service.title} work by Adams Services`}
            loading="lazy"
          />
        ) : (
          <div className="svc__placeholder">
            <service.icon size={60} strokeWidth={1.3} />
            <span>Photos coming soon</span>
          </div>
        )}
      </Reveal>

      <Reveal delay={0.08} className="svc__content">
        <span className="svc__icon" aria-hidden="true">
          <service.icon size={25} strokeWidth={1.9} />
        </span>
        <h3 className="svc__title">{service.title}</h3>
        <p className="svc__body">{service.description}</p>

        <ul className="svc__includes">
          {service.includes.map((item) => (
            <li key={item}>
              <Check size={16} strokeWidth={2.6} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <a href={business.phoneHref} className="btn btn--primary svc__cta">
          <Phone size={17} strokeWidth={2.2} />
          Get a free estimate
        </a>
      </Reveal>
    </article>
  );
}

export default function Services() {
  const location = useLocation();
  const jumpRef = useRef<HTMLDivElement>(null);
  /* Drives the "scroll for more" hint on the chip row. */
  const [canScrollMore, setCanScrollMore] = useState(false);

  useEffect(() => {
    const el = jumpRef.current;
    if (!el) return;

    const update = () => {
      // 4px tolerance so the hint clears at the true end of the row.
      const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
      setCanScrollMore(remaining > 4);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  /* Deep links like /services#sprinklers scroll to that service. */
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    const id = location.hash.slice(1);
    const raf = requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.hash]);

  const coreServices = services.filter((s) => s.season === 'core');
  const seasonalServices = services.filter((s) => s.season === 'seasonal');

  return (
    <>
      {/* Page header */}
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--light">Our Services</span>
            <h1 className="page-hero__title">
              Everything your property needs, all year
            </h1>
            <p className="page-hero__lede">
              Adams Services covers design, installation, maintenance, and
              seasonal work across {business.serviceArea}. Here is exactly what
              each service includes.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Quick jump nav */}
      <nav
        className={`jump ${canScrollMore ? 'jump--more' : ''}`}
        aria-label="Jump to a service"
      >
        <div className="jump__inner container" ref={jumpRef}>
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="jump__chip"
            >
              <service.icon size={16} strokeWidth={2} aria-hidden="true" />
              {service.title}
            </a>
          ))}
        </div>

        {/* Affordance so people know the row keeps going sideways. */}
        <span className="jump__hint" aria-hidden="true">
          <span className="jump__hint-text">Scroll for more</span>
          <ChevronRight size={16} strokeWidth={2.6} />
        </span>
      </nav>

      {/* Core services */}
      <section className="section" aria-labelledby="core-title">
        <div className="container">
          <Reveal className="svc-group__head">
            <span className="eyebrow">Core Services</span>
            <h2 id="core-title" className="section-title">
              Year-round landscaping &amp; property care
            </h2>
          </Reveal>

          <div className="svc-list">
            {coreServices.map((service, i) => (
              <ServiceBlock
                key={service.slug}
                service={service}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photo band — breaks up the long white stretch of service rows */}
      <section className="svc-band" aria-labelledby="svc-band-title">
        <div className="svc-band__media">
          <img
            src={bandImage}
            alt="Boulder retaining wall and prepped planting bed installed by Adams Services"
            loading="lazy"
          />
          <div className="svc-band__scrim" />
        </div>

        <div className="container svc-band__inner">
          <Reveal className="svc-band__content">
            <span className="eyebrow eyebrow--light">Why Adams Services</span>
            <h2 id="svc-band-title" className="svc-band__title">
              One crew, one number, every season
            </h2>
            <p className="svc-band__lede">
              You should not need four contractors to keep one property
              looking right. We design it, build it, maintain it, and clear
              it when the snow comes.
            </p>

            <ul className="svc-band__points">
              <li>
                <span className="svc-band__point-icon" aria-hidden="true">
                  <Sparkles size={20} strokeWidth={2} />
                </span>
                <span>
                  <strong>Free on-site estimates</strong>
                  Clear scope and honest pricing before any work starts.
                </span>
              </li>
              <li>
                <span className="svc-band__point-icon" aria-hidden="true">
                  <CalendarCheck size={20} strokeWidth={2} />
                </span>
                <span>
                  <strong>Same crew, same schedule</strong>
                  You always know who is coming and when.
                </span>
              </li>
              <li>
                <span className="svc-band__point-icon" aria-hidden="true">
                  <Truck size={20} strokeWidth={2} />
                </span>
                <span>
                  <strong>We haul it all away</strong>
                  Nothing gets left behind for you to deal with.
                </span>
              </li>
            </ul>

            <a href={business.phoneHref} className="btn btn--leaf">
              <Phone size={18} strokeWidth={2.2} />
              Call {business.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Seasonal services */}
      <section
        className="section section--tint"
        aria-labelledby="seasonal-title"
      >
        <div className="container">
          <Reveal className="svc-group__head">
            <span className="eyebrow">Winter &amp; Seasonal</span>
            <h2 id="seasonal-title" className="section-title">
              Seasonal services worth booking early
            </h2>
            <p className="section-lede">
              These fill up fast once the weather turns. Reach out ahead of the
              season to lock in your spot on the route.
            </p>
          </Reveal>

          <div className="svc-list">
            {seasonalServices.map((service, i) => (
              <ServiceBlock
                key={service.slug}
                service={service}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta" aria-labelledby="svc-cta-title">
        <div className="container svc-cta__inner">
          <Reveal>
            <h2 id="svc-cta-title" className="svc-cta__title">
              Not sure which service you need?
            </h2>
            <p className="svc-cta__lede">
              Give us a call and describe the project. We will walk the
              property, talk through the options, and put together a clear
              estimate — free of charge.
            </p>
            <div className="svc-cta__actions">
              <a href={business.phoneHref} className="btn btn--leaf">
                <Phone size={18} strokeWidth={2.2} />
                {business.phone}
              </a>
              <Link to="/gallery" className="btn btn--glass">
                See completed projects
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
