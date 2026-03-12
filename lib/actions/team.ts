"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: members };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createTeamMember(data: any) {
  try {
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
        linkedin: data.linkedin,
        facebook: data.facebook,
        instagram: data.instagram,
        email: data.email,
        order: data.order || 0,
      },
    });
    revalidatePath("/admin/team");
    revalidatePath("/about");
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTeamMember(id: string, data: any) {
  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
        linkedin: data.linkedin,
        facebook: data.facebook,
        instagram: data.instagram,
        email: data.email,
        order: data.order,
      },
    });
    revalidatePath("/admin/team");
    revalidatePath("/about");
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });
    revalidatePath("/admin/team");
    revalidatePath("/about");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
