import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Phone, Camera } from 'lucide-react';
import {
  business,
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from '../data/site';
import Reveal from '../components/Reveal';
import './Gallery.css';

type Filter = GalleryCategory | 'All';

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const visibleItems = useMemo(
    () =>
      filter === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter]
  );

  /* Only offer filters that actually have photos behind them. */
  const availableFilters = useMemo<Filter[]>(() => {
    const used = galleryCategories.filter((cat) =>
      galleryItems.some((item) => item.category === cat)
    );
    return ['All', ...used];
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + visibleItems.length) % visibleItems.length
    );
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % visibleItems.length
    );
  }, [visibleItems.length]);

  /* Keyboard controls + scroll lock while the lightbox is open. */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const active = lightboxIndex === null ? null : visibleItems[lightboxIndex];

  return (
    <>
      {/* Page header */}
      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow--light">Our Work</span>
            <h1 className="page-hero__title">
              Projects from around {business.serviceArea}
            </h1>
            <p className="page-hero__lede">
              Rock work, paver installs, retaining walls, and full landscape
              builds — photographed on completion. Tap any image to view it
              full size.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <h2 id="gallery-title" className="visually-hidden">
            Project gallery
          </h2>

          {/* Filters */}
          <div
            className="filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {availableFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter ${filter === cat ? 'filter--active' : ''}`}
                onClick={() => {
                  setFilter(cat);
                  setLightboxIndex(null);
                }}
                aria-pressed={filter === cat}
              >
                {cat}
                <span className="filter__count">
                  {cat === 'All'
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Masonry-ish grid */}
          <motion.div layout className="gallery">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, i) => (
                <motion.button
                  key={item.src}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="tile"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View larger: ${item.caption}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span className="tile__overlay">
                    <span className="tile__category">{item.category}</span>
                    <span className="tile__caption">{item.caption}</span>
                  </span>
                  <span className="tile__zoom" aria-hidden="true">
                    <Camera size={18} strokeWidth={2} />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* More-work note */}
          <Reveal className="gallery__note">
            <p>
              We photograph most builds as they wrap. For more examples of a
              specific service — snow routes, holiday lighting, or sprinkler
              work — just ask and we will send recent photos.
            </p>
            <a href={business.phoneHref} className="btn btn--primary">
              <Phone size={18} strokeWidth={2.2} />
              Call {business.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="lightbox__close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <X size={24} strokeWidth={2.2} />
            </button>

            {visibleItems.length > 1 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={26} strokeWidth={2.2} />
              </button>
            )}

            <motion.figure
              className="lightbox__figure"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.src} alt={active.alt} />
              <figcaption className="lightbox__caption">
                <span className="lightbox__category">{active.category}</span>
                <span>{active.caption}</span>
                {visibleItems.length > 1 && (
                  <span className="lightbox__counter">
                    {(lightboxIndex ?? 0) + 1} / {visibleItems.length}
                  </span>
                )}
              </figcaption>
            </motion.figure>

            {visibleItems.length > 1 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={26} strokeWidth={2.2} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
