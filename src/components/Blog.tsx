import React from 'react';
import { useQuery } from '@apollo/client';
import client from '../apollo-client';
import { LIST_BLOG_POSTS, BlogPost, ListBlogPostsResponse } from '../graphql/queries';
import ReactMarkdown from 'react-markdown';
import { Clock, Tag, ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { data, loading, error } = useQuery<ListBlogPostsResponse>(
    LIST_BLOG_POSTS,
    { client }
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-grey-1 to-grey-5 pt-32">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-grey-1 to-grey-5 pt-32">
        <div className="container mx-auto py-8 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">Fehler beim Laden der Blog-Einträge.</p>
          </div>
        </div>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80";

  // Sort posts by date in descending order (newest first)
  const sortedPosts = [...data.listBlogPosts.items].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-grey-1 to-grey-5 pt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          <p className="text-gray-400 text-lg">
            Aktuelle Einblicke in die digitale Welt und unsere Arbeit
          </p>
        </div>

        <div className="grid gap-12 max-w-5xl mx-auto">
          {sortedPosts.map((post: BlogPost) => (
            <article 
              key={post.id} 
              className="group relative bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img
                    src={post.image || defaultImage}
                    alt={post.title}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('de-DE')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5 min Lesezeit
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Team Tricon
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <div className="prose prose-sm prose-invert max-w-none mb-6 line-clamp-3">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        Digital
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                        Innovation
                      </span>
                    </div>

                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      <span>Weiterlesen</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 md:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Newsletter abonnieren</h3>
              </div>
              <p className="text-gray-400 mb-8 max-w-lg">
                Bleiben Sie auf dem Laufenden mit unseren neuesten Artikeln und Insights aus der digitalen Welt.
              </p>
              <form className="flex gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Ihre E-Mail Adresse"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg font-medium transition-colors"
                >
                  Abonnieren
                </button>
              </form>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}