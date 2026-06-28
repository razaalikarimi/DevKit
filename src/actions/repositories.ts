"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth, currentUser } from "@clerk/nextjs/server"
import { fetchGithubRepoMeta } from "@/lib/github"

const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  try {
    let user = await db.user.findUnique({ where: { clerkId } });
    if (!user) {
      const clerkUser = await currentUser();
      user = await db.user.create({
        data: {
          clerkId,
          email: clerkUser?.emailAddresses[0]?.emailAddress || `${clerkId}@example.com`,
          name: clerkUser?.fullName || 'New User',
        }
      });
    }
    return user.id;
  } catch (error) {
    return null;
  }
}

// Ensure the user has a Workspace to attach the repo to
const getPrimaryWorkspaceId = async (userId: string) => {
  // Check if they are a member of any workspace
  const member = await db.workspaceMember.findFirst({
    where: { userId }
  });
  if (member) return member.workspaceId;
  
  // Create a default workspace if they have none
  const newWorkspace = await db.workspace.create({
    data: {
      name: "My Workspace",
      slug: `workspace-${userId.substring(0, 8)}`,
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    }
  });

  await db.workspaceMember.create({
    data: {
      userId,
      workspaceId: newWorkspace.id,
      role: "OWNER"
    }
  });

  return newWorkspace.id;
}

export const getRepositories = async () => {
  const userId = await getDbUserId();
  if (!userId) return [];

  try {
    const workspaceId = await getPrimaryWorkspaceId(userId);
    return await db.repository.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("[getRepositories] Error:", error);
    return [];
  }
}

export const addRepository = async (url: string) => {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Unauthorized");

  const meta = await fetchGithubRepoMeta(url);
  if (!meta) {
    throw new Error("Invalid GitHub URL or repository not found.");
  }

  const workspaceId = await getPrimaryWorkspaceId(userId);

  try {
    const repo = await db.repository.create({
      data: {
        name: meta.name,
        fullName: meta.fullName,
        url: meta.url,
        description: meta.description,
        language: meta.language,
        defaultBranch: meta.defaultBranch,
        isPrivate: meta.isPrivate,
        githubId: meta.githubId,
        ownerId: userId,
        workspaceId,
        status: "READY" // We set it to ready instantly for this option since we don't index files yet
      }
    });
    
    revalidatePath("/repomind");
    return { success: true, data: repo };
  } catch (error: any) {
    console.error("[addRepository] Error:", error);
    if (error.code === 'P2002') {
      return { success: false, error: "This repository has already been connected." };
    }
    return { success: false, error: "Failed to connect repository." };
  }
}

export const getRepositoryById = async (id: string) => {
  try {
    return await db.repository.findUnique({
      where: { id },
      include: { files: true }
    });
  } catch (error) {
    console.error("[getRepositoryById] Error:", error);
    return null;
  }
}

