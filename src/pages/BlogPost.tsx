import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import { api, type Blog } from '../lib/api';

function BlogPostPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.blogs.get(id).then(setBlog).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Post not found');
    });
  }, [id]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/#writing" className="link-primary text-sm">← Back</Link>
        {error && <div className="alert alert-error mt-6">{error}</div>}
        {!blog && !error && <div className="skeleton h-64 w-full mt-8" />}
        {blog && (
          <>
            <img src={blog.imageUrl} alt="" className="w-full max-h-80 object-cover rounded-2xl mt-6 border border-primary/15" />
            <h1 className="text-4xl md:text-6xl font-bold uppercase mt-8">{blog.title}</h1>
            <div className="prose prose-invert mt-8 whitespace-pre-wrap text-gray-300 leading-relaxed">
              {blog.content}
            </div>
          </>
        )}
      </article>
    </div>
  );
}

export default BlogPostPage;
