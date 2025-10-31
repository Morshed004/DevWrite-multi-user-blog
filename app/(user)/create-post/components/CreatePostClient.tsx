'use client';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  EyeIcon,
  DocumentTextIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import MarkdownPreview from '@/components/MarkdownPreview';
import { createPost } from '@/lib/action/action';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { githubDark } from '@uiw/codemirror-themes-all';
import { toast } from 'sonner';

// Define available post categories
const categories = [
  "Web Development",
  "React",
  "TypeScript",
  "CSS",
  "JavaScript",
  "Performance",
  "Accessibility",
  "DevOps",
  "Mobile Development",
  "UI/UX Design"
];

// Client component that uses the data
export default function CreatePostClient() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
  });

  const [currentTag, setCurrentTag] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditorChange = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      content: value || ''
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      // Limit to 5 tags
      if (!formData.tags.includes(currentTag.trim()) && formData.tags.length < 5) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
        setCurrentTag('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      console.error('Validation Error: Please fill in required fields (Title, Content, Category).');
      return;
    }

    setIsSubmitting(true);

    try {

      // Call server action
      await createPost({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
      });

      // Reset form after successful submission
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
      });
      toast.success("Post created successfully!")
      router.push("/")
    } catch {
      toast.error("Failed to create post")
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.category;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-gray-900 select-none hover:text-blue-600 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Publish Button */}
              <button
                type="submit"
                form="create-post-form"
                disabled={!isFormValid || isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create New Post</h1>
            <p className="text-gray-600">Share your knowledge and insights with the community</p>
          </div>

          <form id="create-post-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-3">
                Post Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a compelling title for your post..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-3">
                Excerpt (A short summary for previews)
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Write a brief, SEO-friendly description of your post..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                maxLength={250}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {formData.excerpt.length}/250 characters
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-3">
                Category *
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[30px]">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-sm"
                  >
                    <TagIcon className="w-3 h-3" />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-500 hover:text-blue-900 ml-1 transition-colors leading-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter (max 5 tags)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                disabled={formData.tags.length >= 5}
              />
              <div className="text-sm text-gray-500 mt-2 flex justify-between">
                <span>Separate tags with the Enter key.</span>
                <span>{formData.tags.length}/5 tags added</span>
              </div>
            </div>

            {/* Content & Editor Tabs */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tab Header */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-semibold text-sm transition-colors ${activeTab === 'write'
                      ? 'border-blue-600 text-blue-600 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-semibold text-sm transition-colors ${activeTab === 'preview'
                      ? 'border-blue-600 text-blue-600 bg-gray-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <EyeIcon className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {activeTab === 'write' ? (
                  <div className="min-h-[500px]">
                    <CodeMirror
                      value={formData.content}
                      height="500px"
                      extensions={[markdown()]}
                      onChange={handleEditorChange}
                      theme={githubDark}
                      basicSetup={{
                        lineNumbers: false,
                        highlightActiveLine: true,
                        highlightSelectionMatches: true,
                        foldGutter: true,
                        dropCursor: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                        rectangularSelection: true,
                        crosshairCursor: true,
                        highlightActiveLineGutter: true,
                        highlightSpecialChars: true,
                        syntaxHighlighting: true,
                      }}
                      style={{
                        fontSize: '20px',
                      }}
                    />
                  </div>
                ) : (
                  <div className="min-h-[400px] border border-gray-200 p-4 rounded-lg bg-white shadow-inner">
                    {formData.content ? (
                      <MarkdownPreview content={formData.content} />
                    ) : (
                      <div className="text-gray-500 text-center py-16">
                        <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Start writing to see the **live preview**...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}