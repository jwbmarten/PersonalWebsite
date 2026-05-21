import PixelSolitaireImg from '../assets/PixelSolitaire_new.png';
import GarminAppImg from '../assets/jwbBlock_updated.png';
import PulseCheckImg from '../assets/pulseCheck.png'

export type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  /**
   * If true, this project appears on the Home page "featured" carousel/section.
   * All projects (featured or not) will appear on the full Projects page.
   */
  featured?: boolean;
  tags?: string[];
  year?: number | string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
    {
    id: 'pulse-check',
    title: 'PulseCheck Healthcare Analysis WebApp',
    description:
      'EC2 deployed full-stack healthcare analytics platform leveraging large-scale nationwide ICU and behavioral health datasets to analyze patient outcomes by demographics, drug treatments, lifestyle behaviors, and more.',
    img: PulseCheckImg,
    featured: true,
    tags: ['Amazon EC2', 'PostgreSQL', 'JavaScript', 'React'],
    year: 2024,
    links: [{ label: 'Repo (GitHub)', href: 'https://github.com/jwbmarten/pulseCheck' }],
  },
  {
    id: 'garmin-watchface',
    title: 'Garmin Watch Face',
    description:
      'A custom Garmin watch face written in MonkeyC that collects and displays biometrics in real time.',
    img: GarminAppImg,
    featured: true,
    tags: ['MonkeyC', 'Embedded'],
    year: 2024,
    links: [{ label: 'Repo (GitHub)', href: 'https://github.com/jwbmarten/jwblock' }],
  },
  {
    id: 'pixel-solitaire',
    title: 'Pixel Solitaire',
    description:
      'A desktop Solitaire implementation built with LibGDX (Java). I aimed to implement the game logic myself rather than rely on a full game engine so it would be lightweight and easy to ship to family members.',
    img: PixelSolitaireImg,
    featured: true,
    tags: ['Java', 'LibGDX', 'Game'],
    year: 2023,
    links: [
      { label: 'Repo (GitHub)', href: 'https://github.com/jwbmarten/PixelSolitaireREDUX' },
    ],
  },
];

export default projects;
