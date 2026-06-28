"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

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

const getDefaultWorkspace = async (userId: string) => {
  let member = await db.workspaceMember.findFirst({
    where: { userId },
    include: { workspace: true }
  });

  if (!member) {
    const workspace = await db.workspace.create({
      data: {
        name: "My Workspace",
        slug: `ws-${Date.now()}`,
        inviteCode: `INV-${crypto.randomUUID().substring(0, 8)}`,
      }
    });
    member = await db.workspaceMember.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: "Owner"
      },
      include: { workspace: true }
    });
  }

  return member.workspace;
}

export const getTeamMembers = async () => {
  const userId = await getDbUserId();
  if (!userId) return [];

  const workspace = await getDefaultWorkspace(userId);
  
  const members = await db.workspaceMember.findMany({
    where: { workspaceId: workspace.id },
    include: {
      user: true
    }
  });

  return members.map(m => ({
    id: m.id,
    name: m.user.name || "Unknown",
    email: m.user.email,
    role: m.role,
    image: m.user.imageUrl || "",
    isMe: m.user.id === userId
  }));
}

export const getWorkspaceInfo = async () => {
  const userId = await getDbUserId();
  if (!userId) return null;
  return await getDefaultWorkspace(userId);
}

export const removeMember = async (memberId: string) => {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Unauthorized");

  await db.workspaceMember.delete({
    where: { id: memberId }
  });
  
  revalidatePath("/team");
}

export const inviteMember = async (email: string) => {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Unauthorized");

  const workspace = await getDefaultWorkspace(userId);

  try {
    const invite = await db.workspaceInvite.create({
      data: {
        email,
        workspaceId: workspace.id
      }
    });
    revalidatePath("/team");
    return { success: true, inviteId: invite.id };
  } catch (err) {
    console.error("Failed to invite member:", err);
    return { success: false, error: "Failed to invite member (maybe already invited?)" };
  }
}

export const getPendingInvites = async () => {
  const userId = await getDbUserId();
  if (!userId) return [];

  const workspace = await getDefaultWorkspace(userId);

  const invites = await db.workspaceInvite.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: 'desc' }
  });

  return invites.map(inv => ({
    id: inv.id,
    email: inv.email,
    sentAt: inv.createdAt
  }));
}

export const revokeInvite = async (inviteId: string) => {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Unauthorized");

  try {
    await db.workspaceInvite.deleteMany({
      where: { id: inviteId }
    });
  } catch (error) {
    console.error("Failed to revoke invite:", error);
  }
  
  revalidatePath("/team");
}

export const getInviteDetails = async (inviteId: string) => {
  const invite = await db.workspaceInvite.findUnique({
    where: { id: inviteId },
    include: { workspace: true }
  });
  
  if (!invite) return null;
  return {
    id: invite.id,
    email: invite.email,
    workspaceName: invite.workspace.name
  };
}

export const acceptInvite = async (inviteId: string) => {
  const userId = await getDbUserId();
  if (!userId) return { success: false, error: "You must be logged in to accept an invite." };

  try {
    const invite = await db.workspaceInvite.findUnique({
      where: { id: inviteId }
    });

    if (!invite) return { success: false, error: "Invalid or expired invite." };

    // Check if user is already a member
    const existing = await db.workspaceMember.findFirst({
      where: { userId, workspaceId: invite.workspaceId }
    });

    if (!existing) {
      await db.workspaceMember.create({
        data: {
          userId,
          workspaceId: invite.workspaceId,
          role: "Member"
        }
      });
    }

    // Delete the invite since it's used
    await db.workspaceInvite.delete({
      where: { id: inviteId }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to accept invite:", error);
    return { success: false, error: "Something went wrong accepting the invite." };
  }
}
