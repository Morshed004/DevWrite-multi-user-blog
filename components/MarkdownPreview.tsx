'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeRaw, { passThrough: ['div', 'span', 'button'] }],
          rehypeHighlight
        ]}
        // This is important for allowing HTML
        skipHtml={false}
      >
        {content || '*Start writing your post...*'}
      </ReactMarkdown>
    </div>
  );
}