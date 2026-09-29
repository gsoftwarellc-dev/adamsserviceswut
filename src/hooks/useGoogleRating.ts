import { useEffect, useState } from 'react';
import { business } from '../data/site';

interface RatingState {
  rating: number;
  reviewCount: number;
  /** Where to send people to read the reviews. */
  url: string;
  /** True once live Google numbers have replaced the fallback. */
  isLive: boolean;
}

interface ReviewsPayload {
  configured?: boolean;
  rating?: number;
  reviewCount?: number;
  url?: string | null;
}

/** Numbers shipped in site.ts — shown until (and unless) the API answers. */
const fallback: RatingState = {
  rating: business.rating,
  reviewCount: business.reviewCount,
  url: business.googleReviewsUrl,
  isLive: false,
};

/**
 * Reads the live Google rating from /api/reviews.
 *
 * The endpoint is deliberately forgiving: when the Places API key is not
 * configured (local dev, or before the key is added in Vercel) it reports
 * `configured: false` and we keep showing the reviewed fallback numbers,
 * so the UI never renders an empty or obviously wrong rating.
 */
export function useGoogleRating(): RatingState {
  const [state, setState] = useState<RatingState>(fallback);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/reviews', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ReviewsPayload | null) => {
        if (!data?.configured || typeof data.rating !== 'number') return;

        setState({
          rating: data.rating,
          reviewCount: data.reviewCount ?? 0,
          url: data.url || business.googleReviewsUrl,
          isLive: true,
        });
      })
      .catch(() => {
        /* Offline, aborted, or no API route in dev — keep the fallback. */
      });

    return () => controller.abort();
  }, []);

  return state;
}
