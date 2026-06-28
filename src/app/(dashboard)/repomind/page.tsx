import { getRepositories } from "@/actions/repositories";
import { RepoClient } from "./RepoClient";

export default async function RepoMindDashboard() {
  const repos = await getRepositories();

  return (
    <RepoClient initialRepos={repos} />
  );
}
