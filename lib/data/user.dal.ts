"use server"
import { getServerSession } from "@/lib/action/get-session"
import prisma from "@/lib/prisma";
import { UserSummary } from "@/types/types";
import { redirect } from "next/navigation";
import { cache } from "react";



interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

interface SavePost {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
  };
}


interface UserData {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  skill: string[];
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
  savePosts: SavePost[];
}



export const getUserData = cache(async (): Promise<UserData> => {
  const session = await getServerSession();
  const userSession = session?.user;

  // Redirect before trying anything else
  if (!session || !userSession) {
    redirect("/signin")
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userSession.id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            excerpt: true,
            category: true,
          },
        },
        savePosts: {
          select: {
            post: {
              select: {
                id: true,
                title: true,
                excerpt: true,
                category: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  } catch (error) {
    throw new Error("Internal Server Error!")
  }
});


// get all user
export const getAllUserSummaries = cache(async(): Promise<UserSummary[]> =>{
  const session = await getServerSession();
  const user = session?.user;

  if (!session || !user) redirect("/signin");
  if (!user.isAdmin) redirect("/");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      isAdmin: true,
      _count: { select: { posts: true } },
    },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    joinedAt: u.createdAt.toISOString(),
    isAdmin: u.isAdmin,
    postCount: u._count.posts,
  }));
})

export const totalUserCount = cache(async ()=>{
  const session = await getServerSession();
  const user = session?.user;
  if(!session || !user) redirect("/signin");

  if(!user.isAdmin) redirect("/");
  
  const userCount: number = await prisma.user.count();
  return userCount;
})