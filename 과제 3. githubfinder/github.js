import CONFIG from "./config.js";
import { Octokit } from "https://esm.sh/@octokit/rest";

export class Github {
  constructor() {
    this.repos_count = 5;
    this.repos_sort = "created: asc";
    this.page = 1;
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}`,
      {
        headers: {
          Authorization: `Bearer ${CONFIG.access_token}`,
        },
      }
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`,
      {
        headers: {
          Authorization: `Bearer ${CONFIG.access_token}`,
        },
      }
    );

    const octokit = new Octokit({
      auth: `Bearer ${CONFIG.access_token}`,
    });

    try {
      const response = await octokit.request(
        "GET /networks/{owner}/{repo}/events",
        {
          owner: "102sae",
          repo: "inflearn",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].created_at);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    return {
      profile,
      repos,
    };
  }
}
