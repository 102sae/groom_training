import CONFIG from "./config.js";
export class Github {
  constructor() {
    this.repos_count = 5;
    this.repos_sort = "created: asc";
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

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    console.log(profile);
    console.log(repos);
    return {
      profile,
      repos,
    };
  }
}
