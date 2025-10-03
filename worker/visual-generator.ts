import { GeneratedVisual } from '../src/lib/types';
const MOCK_VISUALS: Omit<GeneratedVisual, 'id'>[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-6d221bde380f?q=80&w=800&auto=format&fit=crop',
    prompt: 'A vibrant banner for a cloud platform, futuristic theme.',
    alt: 'Vibrant futuristic banner for a cloud platform',
    headline: 'Experience The Future',
    ctaText: 'Get Started Now',
    primaryColor: '#4338ca',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1585224329989-3543b59078fa?q=80&w=800&auto=format&fit=crop',
    prompt: 'Minimalist design showcasing product security features.',
    alt: 'Minimalist design for product security features',
    headline: 'Unbreakable Security',
    ctaText: 'Learn More',
    primaryColor: '#db2777',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop',
    prompt: 'A banner with a focus on global connectivity and speed.',
    alt: 'Banner showing global connectivity and speed',
    headline: 'Connect Globally, Instantly',
    ctaText: 'Explore Network',
    primaryColor: '#0ea5e9',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1611162616805-669c3fa0de13?q=80&w=800&auto=format&fit=crop',
    prompt: 'Creative visual for a developer-focused campaign.',
    alt: 'Creative visual for a developer campaign',
    headline: 'Build Without Limits',
    ctaText: 'Start Building',
    primaryColor: '#16a34a',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    prompt: 'Abstract representation of data flow and processing.',
    alt: 'Abstract data flow representation',
    headline: 'Intelligent Data Flow',
    ctaText: 'Discover APIs',
    primaryColor: '#f97316',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=800&auto=format&fit=crop',
    prompt: 'A colorful and engaging banner for a new feature launch.',
    alt: 'Colorful banner for a new feature launch',
    headline: 'New Features Are Here!',
    ctaText: 'See What\'s New',
    primaryColor: '#db2777',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop',
    prompt: 'Professional and clean design for an enterprise solution.',
    alt: 'Professional design for an enterprise solution',
    headline: 'Enterprise-Grade Solutions',
    ctaText: 'Contact Sales',
    primaryColor: '#4338ca',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1611944212129-29955ae40351?q=80&w=800&auto=format&fit=crop',
    prompt: 'A playful and whimsical visual to attract new users.',
    alt: 'Playful visual to attract new users',
    headline: 'Join The Fun!',
    ctaText: 'Sign Up Free',
    primaryColor: '#0ea5e9',
  },
];
export function generateMockVisuals(): GeneratedVisual[] {
  // In a real scenario, we'd use the input to customize the output.
  // For this mock, we just shuffle and return the static data.
  return MOCK_VISUALS
    .map(visual => ({ ...visual, id: crypto.randomUUID() }))
    .sort(() => 0.5 - Math.random());
}