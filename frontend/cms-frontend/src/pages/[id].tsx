// src/pages/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../app/layout';
import ReactMarkdown from 'react-markdown';
import '../app/globals.css';
import remarkGfm from 'remark-gfm';

interface ArticleData {
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [articleData, setArticleData] = useState<ArticleData>({ title: '', content: '', publishedDate: '', authorName: 'Author Name' });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/articles/${id}?populate=author`);
      const json = await res.json();
      const { title, content, publishedAt, author } = json.data.attributes;
  
      // Extract the author's username from the nested structure
      const authorName = author.data.attributes.username; // Access the username from the nested author object
  
      setArticleData({ 
        title, 
        content, 
        publishedDate: publishedAt, 
        authorName // Set the extracted authorName
      });
    };
  
    if (id) fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="bg-gray-800 min-h-screen text-white py-10">
        <article className="max-w-4xl mx-auto p-5 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">{articleData.title}</h1>
          <p className="text-gray-400 text-sm mb-5">By {articleData.authorName} on {new Date(articleData.publishedDate).toLocaleDateString()}</p>
          <div className="bg-gray-700 p-5 rounded-lg text-gray-300">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{articleData.content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default ArticlePage;