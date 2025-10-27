import { JSX } from 'react';

interface ContentBlockText {
  type: 'text';
  text: string;
}
interface ContentBlockImage {
  type: 'image';
  src: string;
  alt?: string;
}

type ContentBlock = ContentBlockText | ContentBlockImage;

interface PostProps {
  title: string;
  date: string; // ISO or readable
  tags?: string[];
  content: ContentBlock[];
}

export default function PostTemplate({ title, date, tags, content }: PostProps): JSX.Element {
  return (
    <article className="w-full max-w-[900px] mx-auto bg-[rgb(35,39,47)] rounded-lg p-6 text-white shadow-xl ring-1 ring-black">
      <header className="mb-4">
        <h2 className="text-3xl font-arvo text-[#fdd262]">{title}</h2>
        <div className="text-sm text-[rgb(140,150,150)]">{new Date(date).toLocaleDateString()}</div>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex gap-2">
            {tags.map(t => (
              <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded">{t}</span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        {content.map((c, i) => {
          if (c.type === 'text') return <p key={i} className="mb-4">{c.text}</p>;
          return (
            <div key={i} className="mb-4">
              <img src={c.src} alt={c.alt ?? ''} className="w-full rounded" />
            </div>
          );
        })}
      </div>
    </article>
  );
}
