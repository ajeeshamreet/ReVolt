import { theme } from '../theme';

export const ONBOARDING_SLIDES = [
  {
    key: 'find',
    step: '1. LOCATE',
    title: 'Find Drop-off Depots',
    desc: 'Explore authorized e-waste collection facilities near you with operating hours, contacts, and accepted items.',
    color: theme.colors.mint,
    icon: 'location-sharp',
  },
  {
    key: 'learn',
    step: '2. DISCOVER',
    title: 'Understand The Impact',
    desc: 'Learn how toxic elements like lead and mercury harm ecosystems, and why recovering gold and copper is critical.',
    color: theme.colors.lilac,
    icon: 'book-sharp',
  },
  {
    key: 'earn',
    step: '3. RECYCLE',
    title: 'Calculate & Earn',
    desc: 'Calculate precious metals inside old devices, log facility drop-offs, and grow your eco-points wallet.',
    color: theme.colors.yellow,
    icon: 'leaf-sharp',
  },
];
