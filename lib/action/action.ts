"use server";

import prisma from "../prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "./get-session";
import { cache } from "react";
import { cacheLife, cacheTag, updateTag } from "next/cache";

interface PostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}

interface EditProfile{
  name : string
  email : string
  bio : string
  location? : string
  website? : string
  skill : string[]
}

export async function createPost(postData: PostData) {
  const session = await getServerSession()

  const userInfo = session?.user;
  const userId = userInfo?.id;

  if (!userId) {
    redirect("/signin")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const post = await prisma.post.create({
    data: {
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      category: postData.category,
      tags: postData.tags,
      userId: userId,
    },
  });

  updateTag("post")

  return post;
}


export async function savePost(postId: string){
  const session = await getServerSession()

  const userId = session?.user?.id;

  if (!userId || !session) {
    throw new Error('Unauthorized');
  }
  try {
   await prisma.savePost.create({
    data:{
      postId,
      userId
    }
   })

   updateTag("post");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Unique constraint failed')
    ) {
      // You may want to silently ignore or return an indicator
      return;
    }
    throw error;
  }
}

export async function unsavePost(postId: string) {
  const session = await getServerSession()
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await prisma.savePost.deleteMany({
    where: {
      userId,
      postId,
    },
  });
  updateTag("post")
}

export async function editProfile(editProfileData: EditProfile): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession()

    const userId = session?.user?.id;

    if (!session || !userId) {
      redirect("/");
    }

    // Basic validation
    if (!editProfileData.name?.trim() || !editProfileData.email?.trim()) {
      return { success: false, error: 'Name and email are required' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editProfileData.email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Limit skills to 8
    const skills = editProfileData.skill.slice(0, 8);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: editProfileData.name.trim(),
        email: editProfileData.email.trim(),
        bio: editProfileData.bio?.trim() || null,
        location: editProfileData.location?.trim() || null,
        website: editProfileData.website?.trim() || null,
        skill: skills
      }
    });

    updateTag("user");
    updateTag("post");

    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    };
  }
}

export const getAllPosts = cache(async() => {
  "use cache";
  cacheTag("post")
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
})

export const getPostById = cache(async (id: string) => {
  "use cache";
  cacheTag("post");

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      category: true,
      tags: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          bio: true,
        },
      },
      savePosts: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!post) throw new Error("Post not found");

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
});



export const getShuffledPosts = cache(async () => {
  'use cache';
  cacheTag('post');

  const posts = await prisma.post.findMany();

  // Shuffle once, then cache result
  const newArray = [...posts];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Convert all Date fields to strings
  const serialized = newArray.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return serialized;
});


// -----user delete post functionality----- //
export const userDeletePost = async (postId : string) =>{

  const session = await getServerSession();
  const user = session?.user;

  if(!session || !user) throw new Error("Unauthozied request");

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if(!post) throw new Error("Post not found!");

  const postAuthorId = post.userId;

  if(postAuthorId !== user.id) throw new Error("Forbidden Request");

  await prisma.post.delete({
    where:{
      id: postId
    }
  })

  updateTag("post");

  return { success: true, message: "Post deleted successfully." };

}


// -------user update post-------- //
export const updatePost = async (postId : string, updateData: PostData) =>{

  const session = await getServerSession();
  const user = session?.user;

  if(!session || !user) throw new Error("Unauthozied request");

  const post = await prisma.post.findUnique({
    where:{
      id: postId
    }
  });

  if(!post) throw new Error("Post not found!");

  const postAuthor = post.userId;

  if(postAuthor !== user.id) throw new Error("Forbidden Request");

  // --------call prisma quary to update post----------- //
  await prisma.post.update({
    where:{
      id: postId
    },
    data:{
      title: updateData.title,
      excerpt: updateData.excerpt,
      category: updateData.category,
      content: updateData.content,
      tags: updateData.tags,
      userId: user.id
    }
  })

  updateTag("post");

}