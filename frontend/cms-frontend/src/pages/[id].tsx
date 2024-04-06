// src/pages/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../app/layout';
import ReactMarkdown from 'react-markdown';

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // Fetch article content from Strapi
    const fetchData = async () => {
      const res = await fetch(`http://localhost:1337/api/articles/${id}`);
      const article = await res.json();
      setContent(article.data.attributes.content);
    };

    if (id) fetchData();
  }, [id]);

  return (
    <Layout>
      <article className="prose lg:prose-xl m-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </Layout>
  );
};

export default ArticlePage;