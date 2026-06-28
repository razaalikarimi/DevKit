import { getRepositoryById } from "@/actions/repositories";
import { notFound } from "next/navigation";
import OverviewClient from "./OverviewClient";

export default async function RepoOverview({ params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = await params;
  const repo = await getRepositoryById(repoId);

  if (!repo) {
    return notFound();
  }

  // Convert prisma Date fields to strings for safe client serialization
  const serializedRepo = {
    ...repo,
    createdAt: repo.createdAt.toISOString(),
    updatedAt: repo.updatedAt.toISOString(),
  }

  return <OverviewClient initialRepo={serializedRepo} />;
}
