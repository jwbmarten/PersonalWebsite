import HomeNetworkImg1 from '../assets/HomeNetworkDiagram.png';

export type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt?: string };

export type Post = {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  content: ContentBlock[];
};

const posts: Post[] = [
  {
    id: 'welcome-post',
    title: 'Welcome — hosting my site on a Raspberry Pi',
    date: '2025-10-01',
    tags: ['personal', 'self-hosting'],
    content: [
      { type: 'text', text: 'This is a dummy post to show the new Posts section. I can add paragraphs of text and images between paragraphs.' },
      { type: 'image', src: HomeNetworkImg1, alt: 'Example timeline graphic' },
      { type: 'text', text: 'Here is another paragraph after the image. You can keep adding more text and images in sequence.' },
    ],
  },
];

export default posts;
