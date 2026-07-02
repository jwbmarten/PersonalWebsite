import { JSX } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
    <article className="w-full max-w-[1000px] mx-auto  p-6 text-white rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg shadow-black ring-1 ring-white/20 border border-white/10">
      <header className="mb-4">
        <h3 className="text-3xl font-spartan text-[#fdd262] " style={{ textShadow: "0 3px 5px rgba(0,0,0,0.75)" }}>{title}</h3>
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
          if (c.type === 'text') {
            return (
              <div className="mb-4">
                <ReactMarkdown
                  key={i}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: (props) => (
                      <a {...props} target="_blank" className="text-[#fdd262] underline hover:opacity-80" rel="noopener noreferrer" />
                    ),
                    h2: (props: any) => (
                      <h2
                        {...props}
                        className={`${props.className ?? ''} mt-8 mb-3 text-2xl lg:text-3xl font-spartan` }
                        style={{ textShadow: "0 3px 5px rgba(0,0,0,0.75)" }}
                      />
                    ),
                    h3: (props: any) => (
                      <h3
                        {...props}
                        className={`${props.className ?? ''} mt-6 mb-2 text-xl lg:text-2xl font-spartan`}
                        style={{ textShadow: "0 3px 5px rgba(0,0,0,0.75)" }}
                      />
                    ),
                    h4: (props: any) => (
                      <h4
                        {...props}
                        className={`${props.className ?? ''} mt-5 mb-2 text-lg lg:text-xl font-spartan`}
                      />
                    ),
                  }}
                >
                  {c.text}
                </ReactMarkdown>
              </div>
            )
          }
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
