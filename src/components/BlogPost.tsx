import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import client, { gql } from '../apollo-client';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { GET_BLOG_POST, GetBlogPostResponse } from '../graphql/queries';

export default function BlogPost() {
  const { id } = useParams();
  const { data, loading, error } = useQuery<GetBlogPostResponse>(
    GET_BLOG_POST,
    { 
      client,
      variables: { id }
    }
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
        <div className="container mx-auto py-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-red-400 text-center">
              Der Artikel konnte nicht gefunden werden.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { getBlogPost: post } = data;
  const defaultImage = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-b from-grey-1 to-grey-5 pt-32">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Zurück zur Übersicht</span>
        </Link>

        <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[21/9]">
          <img
            src={post.image || defaultImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
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

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        <div className="flex gap-2 mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
            Digital
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
            Innovation
          </span>
        </div>

        <div className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}