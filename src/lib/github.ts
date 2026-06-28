export const fetchGithubRepoMeta = async (url: string) => {
  try {
    // Basic regex to extract owner and repo from URL
    // e.g. https://github.com/facebook/react
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    if (!match) return null;

    const owner = match[1];
    const repo = match[2].replace(".git", "");

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DevKit-SaaS-App'
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error("Failed to fetch Github metadata", res.statusText);
      return null;
    }

    const data = await res.json();
    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      language: data.language,
      defaultBranch: data.default_branch,
      isPrivate: data.private,
      githubId: data.id,
      url: data.html_url
    };
  } catch (error) {
    console.error("Error fetching github metadata:", error);
    return null;
  }
};
