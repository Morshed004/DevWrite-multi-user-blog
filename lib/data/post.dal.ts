"use server";
import { cache } from "react";
import { getServerSession } from "../action/get-session";
import { redirect } from "next/navigation";
import prisma from "../prisma";
import { PostSummary } from "@/types/types";


export const getAllPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const session = await getServerSession();
  const user = session?.user;

  // check auth
  if (!session || !user) redirect("/signin");
  if (!user.isAdmin) redirect("/");

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          savePosts: true,
        },
      },
    },
  });

  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    author: p.user,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    saveCount: p._count.savePosts,
  }));
});



export const totalPostCount = cache(async ()=>{
  const session = await getServerSession();
  const user = session?.user;
  if(!session || !user) redirect("/signin");

  if(!user.isAdmin) redirect("/");
  
  const userCount: number = await prisma.post.count();
  return userCount;
})
