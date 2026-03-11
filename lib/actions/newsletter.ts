"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email address." };
  }

  try {
    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existing) {
      return { error: "You are already subscribed to our perspectives." };
    }

    await prisma.newsletter.create({
      data: { email }
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Newsletter error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }
}
