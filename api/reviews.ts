/**
 * Live Google rating for the site.
 *
 * Runs as a Vercel Function so the Google Places API key stays server-side
 * (a key shipped in the client bundle would be public and abusable).
 *
 * Required environment variables:
 *   GOOGLE_PLACES_API_KEY - Places API (New) key, restricted to this API
 *   GOOGLE_PLACE_ID       - the Place ID for Adams Services, LLC
 *
 * If either is missing the route returns `configured: false` and the site
 * quietly falls back to the reviewed numbers in src/data/site.ts.
 */

interface PlaceResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

export const config = { runtime: 'nodejs' };

export default async function handler(): Promise<Response> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  const json = (body: unknown, status: number, cache: string) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        'content-type': 'application/json',
        'cache-control': cache,
      },
    });

  if (!apiKey || !placeId) {
    // Not an error: the site renders its fallback numbers instead.
    return json({ configured: false }, 200, 'public, max-age=300');
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri',
        },
      }
    );

    if (!res.ok) {
      return json({ configured: false }, 200, 'public, max-age=120');
    }

    const place = (await res.json()) as PlaceResponse;

    if (typeof place.rating !== 'number') {
      return json({ configured: false }, 200, 'public, max-age=120');
    }

    return json(
      {
        configured: true,
        rating: place.rating,
        reviewCount: place.userRatingCount ?? 0,
        url: place.googleMapsUri ?? null,
        fetchedAt: new Date().toISOString(),
      },
      200,
      // Cache at the edge for 6h, serve stale for a day while revalidating,
      // so Google is polled a handful of times a day rather than per visit.
      'public, s-maxage=21600, stale-while-revalidate=86400'
    );
  } catch {
    return json({ configured: false }, 200, 'public, max-age=120');
  }
}
