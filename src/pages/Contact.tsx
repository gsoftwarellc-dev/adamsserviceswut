import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  MessageSquare,
  ClipboardList,
  CalendarCheck,
} from 'lucide-react';
import { business, services } from '../data/site';
import Reveal from '../components/Reveal';
import './Contact.css';

/** What happens after someone calls — sets expectations before they dial. */
const steps = [
  {
    icon: MessageSquare,
    title: 'Tell us what you need',
    body: 'Give us a call and describe the project. Photos help, but a rough description is plenty to start.',
  },
  {
    icon: ClipboardList,
    title: 'We walk the property',
    body: 'We come out, measure, talk through the options, and put together a clear written estimate — free of charge.',
  },
  {
    icon: CalendarCheck,
    title: 'We get you scheduled',
    body: 'Approve the estimate and we book your date. You know who is coming and when before we start.',
  },
];

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      {/* Page header */}
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--light">Get In Touch</span>
            <h1 className="page-hero__title">
              Let&rsquo;s talk about your property
            </h1>
            <p className="page-hero__lede">
              Free estimates across {business.serviceArea}. Give us a call and
              we will get you on the schedule — no pressure, no obligation.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Primary contact */}
      <section className="section contact" aria-labelledby="contact-title">
        <div className="container contact__inner">
          <Reveal className="contact__main">
            <h2 id="contact-title" className="contact__heading">
              The fastest way to reach us
            </h2>
            <p className="contact__sub">
              We answer the phone ourselves. Call or text during business hours
              and you will talk to the people who will actually be doing the
              work.
            </p>

            <a href={business.phoneHref} className="contact__phone-cta">
              <span className="contact__phone-icon" aria-hidden="true">
                <Phone size={26} strokeWidth={2.1} />
              </span>
              <span className="contact__phone-text">
                <span className="contact__phone-label">Call or text</span>
                <span className="contact__phone-number">{business.phone}</span>
              </span>
              <ArrowRight
                size={22}
                strokeWidth={2.2}
                className="contact__phone-arrow"
                aria-hidden="true"
              />
            </a>

            <a
              href={business.googleReviewsUrl}
              className="contact__reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>
                <strong>{business.rating.toFixed(1)}</strong> from{' '}
                {business.reviewCount} Google reviews
              </span>
            </a>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1} className="contact__details">
            <div className="detail">
              <span className="detail__icon" aria-hidden="true">
                <Clock size={20} strokeWidth={2} />
              </span>
              <div className="detail__body">
                <h3 className="detail__title">Hours</h3>
                <ul className="detail__hours">
                  {business.hours.map((h) => (
                    <li key={h.days}>
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="detail">
              <span className="detail__icon" aria-hidden="true">
                <MapPin size={20} strokeWidth={2} />
              </span>
              <div className="detail__body">
                <h3 className="detail__title">Service area</h3>
                <p className="detail__text">
                  Based in Plain City, Utah, serving surrounding Northern Utah
                  communities. Not sure if you are in range? Give us a call and
                  ask.
                </p>
              </div>
            </div>

            <div className="detail">
              <span className="detail__icon" aria-hidden="true">
                <ClipboardList size={20} strokeWidth={2} />
              </span>
              <div className="detail__body">
                <h3 className="detail__title">What we can quote</h3>
                <ul className="detail__services">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/services#${service.slug}`}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section
        className="section section--tint"
        aria-labelledby="process-title"
      >
        <div className="container">
          <Reveal className="process__head">
            <span className="eyebrow">What To Expect</span>
            <h2 id="process-title" className="section-title">
              From first call to finished job
            </h2>
          </Reveal>

          <div className="process__grid">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.09} className="step">
                <span className="step__number" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="step__icon" aria-hidden="true">
                  <step.icon size={24} strokeWidth={1.9} />
                </span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="svc-cta" aria-labelledby="contact-cta-title">
        <div className="container svc-cta__inner">
          <Reveal>
            <h2 id="contact-cta-title" className="svc-cta__title">
              Ready when you are
            </h2>
            <p className="svc-cta__lede">
              Whether it is a full landscape build or a single sprinkler head,
              we are happy to take a look.
            </p>
            <div className="svc-cta__actions">
              <a href={business.phoneHref} className="btn btn--leaf">
                <Phone size={18} strokeWidth={2.2} />
                {business.phone}
              </a>
              <Link to="/gallery" className="btn btn--glass">
                See our work
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
