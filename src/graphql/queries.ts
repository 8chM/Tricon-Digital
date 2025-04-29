import { gql } from '../apollo-client';

export const LIST_BLOG_POSTS = gql`
  query ListBlogPosts {
    listBlogPosts {
      items {
        id
        title
        content
        image
        date
      }
    }
  }
`;

export const GET_BLOG_POST = gql`
  query GetBlogPost($id: ID!) {
    getBlogPost(id: $id) {
      id
      title
      content
      image
      date
    }
  }
`;

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  date: string;
}

export interface ListBlogPostsResponse {
  listBlogPosts: {
    items: BlogPost[];
  };
}

export interface GetBlogPostResponse {
  getBlogPost: BlogPost;
}