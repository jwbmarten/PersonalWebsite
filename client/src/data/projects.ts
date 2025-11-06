import PixelSolitaireImg from '../assets/PixelSolitaire.png';
import GarminAppImg from '../assets/jwbBlock.png';

export type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  tags?: string[];
  year?: number | string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'garmin-watchface',
    title: 'Garmin Watch Face',
    description:
      'A custom Garmin watch face written in MonkeyC that collects and displays biometrics in real time.',
    img: GarminAppImg,
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
    tags: ['Java', 'LibGDX', 'Game'],
    year: 2023,
    links: [
      { label: 'Repo (GitHub)', href: 'https://github.com/jwbmarten/PixelSolitaireREDUX' },
    ],
  },
];

export default projects;
