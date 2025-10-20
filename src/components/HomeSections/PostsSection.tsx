import { JSX } from 'react';
import posts from '../../data/posts';
import PostTemplate from '../layout/PostTemplate';

export default function PostsSection(): JSX.Element {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-6">
      {posts.map((p) => (
        <div key={p.id} className="w-full px-6">
          <PostTemplate title={p.title} date={p.date} tags={p.tags} content={p.content as any} />
        </div>
      ))}
    </div>
  );
}
