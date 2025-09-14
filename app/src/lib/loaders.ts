import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

// Define the expected types for the responses from your API
interface Post {
  id: string;
  title: string;
  content: string;
  // Add other properties that a Post might have
}

interface User {
  id: string;
  username: string;
  avatar: string;
  // Add other properties that a User might have
}

interface Chat {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  // Add other properties that a Chat might have
}

// Define the types for the loader params
interface LoaderParams {
  request: Request;
  params?: Record<string, string>; // Make params optional
}

// Loader for Single Page
export const singlePageLoader = async ({ params }: LoaderParams): Promise<Post> => {
  try {
    if (!params || !params.id) {
      throw new Error("Post ID is required.");
    }

    // Log the params and the URL being called for debugging
    console.log("Fetching single post with ID:", params.id);

    const res = await apiRequest(`/posts/${params.id}`);

    // Check the response data
    console.log("Single post data:", res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error; // Re-throw the error to handle it properly
  }
};

// Loader for List Page
export const listPageLoader = async ({ request }: LoaderParams) => {
  try {
    const query = request.url.split('?')[1];

    // Log the query being sent for debugging
    console.log("Fetching posts with query:", query);

    const postPromise = apiRequest(`/posts?${query}`);

    // Wrap the API call in `defer` and log it for debugging
    console.log("Deferring post response...");

    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error fetching list of posts:", error);
    throw error; // Re-throw the error to handle it properly
  }
};

// Loader for Profile Page
export const profilePageLoader = async () => {
  const postPromise = apiRequest('/users/profilePosts');
  const chatPromise = apiRequest('/chats');
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
