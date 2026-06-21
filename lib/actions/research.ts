"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { recordActivity } from "./logs";

export async function getResearch() {
  try {
    const research = await prisma.research.findMany({
      orderBy: { year: "desc" },
    });
    return { success: true, data: research };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createResearch(data: any) {
  try {
    const research = await prisma.research.create({
      data: {
        authors: data.authors,
        year: parseInt(data.year, 10),
        title: data.title,
        source: data.source,
        url: data.url || null,
      },
    });

    await recordActivity({
      action: "CREATED",
      entity: "Research",
      details: `Added new research publication: ${data.title}`
    });

    revalidatePath("/admin/research");
    revalidatePath("/research"); // Assuming there might be a public research page
    return { success: true, data: research };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateResearch(id: string, data: any) {
  try {
    const research = await prisma.research.update({
      where: { id },
      data: {
        authors: data.authors,
        year: parseInt(data.year, 10),
        title: data.title,
        source: data.source,
        url: data.url || null,
      },
    });

    await recordActivity({
      action: "UPDATED",
      entity: "Research",
      details: `Updated research publication: ${data.title}`
    });

    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true, data: research };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteResearch(id: string) {
  try {
    const result = await prisma.research.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return { success: false, error: "Research record not found or already deleted." };
    }

    await recordActivity({
      action: "DELETED",
      entity: "Research",
      details: `Deleted research record with ID: ${id}`
    });

    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
