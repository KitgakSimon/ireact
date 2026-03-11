"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/actions/auth";
import { revalidatePath } from "next/cache";

export async function createBlogPost(data: { title: string; excerpt: string; content: string; image: string }) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const { title, excerpt, content, image } = data;

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    const post = await prisma.post.create({
      data: {
        title,
        excerpt,
        content,
        image,
        slug,
        authorId: session.id as string,
        published: true,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, post };
  } catch (error) {
    console.error("Create blog post error:", error);
    return { error: "Error creating post" };
  }
}

export async function updateBlogPost(id: string, data: { title: string; excerpt: string; content: string; image: string }) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const { title, excerpt, content, image } = data;

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        image,
        slug,
      },
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, post };
  } catch (error) {
    console.error("Update blog post error:", error);
    return { error: "Error updating post" };
  }
}


export async function deletePost(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    return { error: "Error deleting post" };
  }
}

export async function postComment(postId: string, data: { content: string; rating: number; guestName?: string; guestEmail?: string }) {
  const session = await getSession();
  const { content, rating, guestName, guestEmail } = data;

  if (!content || content.trim().length < 2) {
    return { error: "Comment is too short." };
  }

  if (rating < 1 || rating > 5) {
    return { error: "Please provide a valid rating (1-5)." };
  }

  if (!session && !guestName) {
    return { error: "Please provide your name to comment." };
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        rating,
        postId,
        userId: session ? (session.id as string) : null,
        guestName: session ? null : guestName,
        guestEmail: session ? null : guestEmail,
      },
    });

    revalidatePath(`/blog/[slug]`);
    return { success: true, comment };
  } catch (error) {
    console.error("Post comment error:", error);
    return { error: "Error posting comment" };
  }
}

export async function deleteComment(id: string) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return { error: "Unauthorized" };

  try {
    await prisma.comment.delete({ where: { id } });
    revalidatePath("/admin/comments");
    return { success: true };
  } catch (error) {
    return { error: "Error deleting comment" };
  }
}

export async function updateComment(id: string, data: { content: string; rating: number }) {
  const session = await getSession();
  
  if (!session || session.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const { content, rating } = data;

  if (!content || content.trim().length < 5) {
    return { error: "Comment content is too short." };
  }

  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: {
        content,
        rating,
      },
    });

    revalidatePath("/admin/comments");
    // Also revalidate the blog post page where this comment is displayed
    revalidatePath(`/blog/[slug]`, 'page');
    
    return { success: true, comment };
  } catch (error) {
    console.error("Update comment error:", error);
    return { error: "Error updating comment." };
  }
}
