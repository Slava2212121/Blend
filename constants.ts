import { Chat, Post, Trend, User } from './types';

export const CURRENT_USER: User = {
  id: 'u_slava',
  staticId: 1,
  name: 'Slava Kolosov',
  handle: '@slava_creator',
  avatar: 'https://srednyadm.ru/media/resized/EQ4q7brlELClmd_K9M5GUVLCHA1iR-9_vuUni3GH8u4/rs:fit:1024:768/aHR0cHM6Ly9zcmVk/bnlhZG0ucnUvbWVk/aWEvcHJvamVjdF9t/b18zOTEvNDkvZjQv/YzMvOTQvYmMvNmEv/aW1hZ2UwMDEuanBn.jpg',
  bio: 'Founder & Creator of Blend Platform.',
  verified: true,
  role: 'CREATOR',
  isOfficial: true,
  isActive: true
};

export const MOCK_USERS: Record<string, User> = {};

export const MOCK_POSTS: Post[] = [];

export const MOCK_CHATS: Chat[] = [];

export const TRENDS: Trend[] = [];