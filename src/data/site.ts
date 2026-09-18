import type { ComponentType } from 'react';
import {
  Trees,
  Droplets,
  Leaf,
  Scissors,
  Snowflake,
  Lightbulb,
  Home,
  Trash2,
} from 'lucide-react';

import paverWalkwayWide from '../assets/gallery/paver-walkway-wide.webp';
import paverWalkwayGravel from '../assets/gallery/paver-walkway-gravel.webp';
import rockBedFeature from '../assets/gallery/rock-bed-feature.webp';
import boulderRetaining from '../assets/gallery/boulder-retaining.webp';
import vinylFence from '../assets/gallery/vinyl-fence.webp';

/* ============================================
   Business details
   ============================================ */

export const business = {
  name: 'Adams Services, LLC',
  shortName: 'Adams Services',
  tagline: 'Premium Landscaping Services',
  phone: '(801) 921-1032',
  phoneHref: 'tel:+18019211032',
  domain: 'adamsservicesut.com',
  serviceArea: 'Plain City & Northern Utah',
  established: 2023,
  rating: 5.0,
  reviewCount: 19,
  googleReviewsUrl:
    'https://www.google.com/search?q=Adams+Services+LLC+Plain+City+UT',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', time: 'By appointment' },
    { days: 'Sunday', time: 'Closed' },
  ],
} as const;

/* ============================================
   Services
   ============================================ */

export type ServiceSeason = 'core' | 'seasonal';

export interface Service {
  slug: string;
  title: string;
  icon: ComponentType<{ size?: number | string; strokeWidth?: number }>;
  season: ServiceSeason;
  /** One-line summary used on the home page cards. */
  summary: string;
  /** Longer description used on the Services page. */
  description: string;
  /** Bullet points of what the service includes. */
  includes: string[];
  /**
   * Representative photo. Omitted where we have no genuine photo of that
   * work yet — those render as an icon panel rather than a misleading image.
   */
  image?: string;
}

export const services: Service[] = [
  {
    slug: 'landscaping-rock-work',
    title: 'Landscaping & Rock Work',
    icon: Trees,
    season: 'core',
    summary:
      'Full landscape design and build — decorative rock, mulch, boulders, and paver installation.',
    description:
      'We design and build outdoor spaces from the ground up. Whether you are starting with bare dirt on a new build or reworking a tired yard, we handle the full scope: grading, weed barrier, decorative rock and mulch, boulder placement, curbing, and paver walkways and patios. Every project is laid out to drain properly and hold its shape for years.',
    includes: [
      'Landscape design & layout',
      'Decorative rock & mulch installation',
      'Boulder & feature rock placement',
      'Paver walkways, patios & borders',
      'Concrete curbing & edging',
      'Weed barrier & ground prep',
    ],
    image: rockBedFeature,
  },
  {
    slug: 'sprinklers',
    title: 'Sprinkler Install & Repair',
    icon: Droplets,
    season: 'core',
    summary:
      'New irrigation systems, repairs, adjustments, and seasonal blowouts done right the first time.',
    description:
      'A well-designed sprinkler system pays for itself in a healthy lawn and a lower water bill. We install complete irrigation systems with proper head spacing and zoning, and we repair and tune existing systems — broken heads, cracked lines, leaking valves, and controllers that never quite worked. We also handle spring start-ups and fall blowouts.',
    includes: [
      'New sprinkler system installation',
      'Broken head & line repair',
      'Valve & controller troubleshooting',
      'Zone design & coverage adjustment',
      'Spring start-up & system checks',
      'Fall winterization blowouts',
    ],
    image: paverWalkwayGravel,
  },
  {
    slug: 'yard-clean-up',
    title: 'Yard Clean Up',
    icon: Leaf,
    season: 'core',
    summary:
      'Seasonal cleanups that reset your property — leaves, debris, trimming, and full haul-away.',
    description:
      'Spring and fall cleanups get your property back to a clean slate. We clear leaves and storm debris, cut back overgrown beds, edge and define borders, trim shrubs, and haul everything away so nothing is left behind. Great for getting ahead of the growing season or closing the yard out before winter.',
    includes: [
      'Spring & fall cleanups',
      'Leaf & debris removal',
      'Bed edging & redefinition',
      'Shrub & hedge trimming',
      'Weed removal',
      'Full haul-away & disposal',
    ],
    image: boulderRetaining,
  },
  {
    slug: 'lawn-maintenance',
    title: 'Lawn Maintenance',
    icon: Scissors,
    season: 'core',
    summary:
      'Reliable recurring mowing, edging, and trimming that keeps your lawn sharp all season.',
    description:
      'Consistent care is what separates a good lawn from a great one. We run weekly and bi-weekly schedules with clean mow lines, crisp edging along drives and walks, string trimming around obstacles, and blown-off hard surfaces every visit. Same crew, same day each week, so you always know when we are coming.',
    includes: [
      'Weekly & bi-weekly mowing',
      'Edging along walks & driveways',
      'String trimming & detail work',
      'Blow-off of walks & patios',
      'Seasonal fertilization programs',
      'Clipping cleanup & removal',
    ],
    image: paverWalkwayWide,
  },
  {
    slug: 'snow-removal',
    title: 'Snow Removal & Ice Melt',
    icon: Snowflake,
    season: 'seasonal',
    summary:
      'Dependable winter clearing for driveways, walks, and lots — plus ice melt application.',
    description:
      'When the storm hits, we are already out. We clear driveways, sidewalks, and commercial lots on a per-storm or seasonal contract, and apply ice melt to keep entries and walkways safe between passes. Priority routing means your property is handled before the morning commute.',
    includes: [
      'Driveway & sidewalk clearing',
      'Commercial lot plowing',
      'Ice melt & salt application',
      'Per-storm or seasonal contracts',
      'Priority early-morning routes',
      'Storm-by-storm monitoring',
    ],
  },
  {
    slug: 'christmas-lights',
    title: 'Christmas Lights',
    icon: Lightbulb,
    season: 'seasonal',
    summary:
      'Professional holiday light design, installation, takedown, and off-season storage.',
    description:
      'Skip the ladder. We design, install, and maintain holiday lighting on rooflines, trees, and landscape features using commercial-grade product cut to fit your home. After the season we take everything down, label it, and store it for next year so setup gets easier every time.',
    includes: [
      'Custom lighting design',
      'Roofline & eave installation',
      'Tree & landscape wrapping',
      'Commercial-grade materials',
      'Mid-season maintenance',
      'Takedown & off-season storage',
    ],
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    icon: Home,
    season: 'seasonal',
    summary:
      'Clear gutters and downspouts that protect your roof, siding, and foundation.',
    description:
      'Clogged gutters send water where it does the most damage. We hand-clear gutters and flush downspouts, bag the debris, and check for loose hangers, sagging runs, and separated seams while we are up there — so small problems get flagged before they become expensive ones.',
    includes: [
      'Full gutter hand-clearing',
      'Downspout flushing',
      'Debris bagging & removal',
      'Hanger & seam inspection',
      'Fall & spring scheduling',
      'Problem-area reporting',
    ],
  },
  {
    slug: 'junk-removal',
    title: 'Junk Removal',
    icon: Trash2,
    season: 'seasonal',
    summary:
      'Fast haul-away of yard waste, construction debris, and household clutter.',
    description:
      'One call and it is gone. We haul off yard waste, old fencing, construction debris, appliances, furniture, and general clutter from garages, sheds, and basements. We load it, sweep up, and dispose of everything responsibly — you do not have to lift a thing.',
    includes: [
      'Yard waste & green debris',
      'Construction & demo debris',
      'Appliance & furniture removal',
      'Garage & shed cleanouts',
      'Full loading — no self-service',
      'Responsible disposal',
    ],
  },
];

/* ============================================
   Gallery
   ============================================ */

export type GalleryCategory =
  | 'Landscaping'
  | 'Rock Work'
  | 'Hardscaping'
  | 'Fencing';

export interface GalleryItem {
  src: string;
  alt: string;
  category: GalleryCategory;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: rockBedFeature,
    alt: 'Curved front-yard rock bed with red lava rock, white accent stone, ornamental grasses, and concrete curbing',
    category: 'Rock Work',
    caption: 'Curved front-yard feature bed with contrast stone inlay',
  },
  {
    src: paverWalkwayWide,
    alt: 'Paver walkway running between decorative gravel beds alongside a brick home',
    category: 'Hardscaping',
    caption: 'Paver walkway with dual-tone gravel beds',
  },
  {
    src: boulderRetaining,
    alt: 'Boulder retaining wall bordering a freshly prepared planting bed with concrete curbing',
    category: 'Landscaping',
    caption: 'Boulder retaining wall and prepped planting bed',
  },
  {
    src: paverWalkwayGravel,
    alt: 'Side-yard paver path separating gray and gold gravel beds next to a vinyl fence',
    category: 'Hardscaping',
    caption: 'Side-yard access path and drainage rock',
  },
  {
    src: vinylFence,
    alt: 'Newly installed white vinyl privacy fence along a property line',
    category: 'Fencing',
    caption: 'White vinyl privacy fence installation',
  },
];

export const galleryCategories: GalleryCategory[] = [
  'Landscaping',
  'Rock Work',
  'Hardscaping',
  'Fencing',
];

/* ============================================
   About — differentiators
   ============================================ */

export const valueProps = [
  {
    title: 'Family owned & operated',
    body: 'Established in 2023 and run by the Adams family. You deal with the owners directly — not a call center or a rotating crew.',
  },
  {
    title: 'One source for the whole property',
    body: 'Design, install, maintain, and clear snow. Instead of juggling four contractors, you keep one number on file year-round.',
  },
  {
    title: 'Work that holds up',
    body: 'Proper grading, base prep, and drainage on every install. We build it so it still looks right several seasons from now.',
  },
  {
    title: 'Straight answers on price',
    body: 'Free on-site estimates with clear scope and no vague line items. What we quote is what you pay.',
  },
];
