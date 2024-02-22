export class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  showProfile(user) {
    this.clearSkeleton(); // 스켈레톤을 지우고
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-3">
      <h3>${user.bio ? user.bio : ""}</h3>
        <img class="img-fluid mb-2" src="${user.avatar_url}">
        <a href="${
          user.html_url
        }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
      </div>
      <div class="col-md-9">
        <span class="badge badge-primary">Public Repos: ${
          user.public_repos
        }</span>
        <span class="badge badge-secondary">Public Gists: ${
          user.public_gists
        }</span>
        <span class="badge badge-success">Followers: ${user.followers}</span>
        <span class="badge badge-info">Following: ${user.following}</span>
        <br><br>
        <ul class="list-group">
          <li class="list-group-item">Company: ${user.company}</li>
          <li class="list-group-item">Website/Blog: ${user.blog}</li>
          <li class="list-group-item">Location: ${user.location}</li>
          <li class="list-group-item">Member Since: ${user.created_at}</li>
        </ul>
      </div>
    </div>
  </div>
  <h3 class="page-heading mb-3">Latest Repos</h3>
  <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = "";

    repos.forEach(function (repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <div>${repo.description ? repo.description : ""}</div>

            </div>
            <div class="col-md-6">
            <span class="badge badge-info">Language: ${repo.language}</span>
            <span class="badge badge-primary">Stars: ${
              repo.stargazers_count
            }</span>
            <span class="badge badge-secondary">Watchers: ${
              repo.watchers_count
            }</span>
           
            </div>
          </div>
         
        </div>
      `;
    });

    output += `<h3 class="page-heading mb-3">Commit Graph</h3>`;
    document.getElementById("repos").innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));
    //검색바 위에 삽입
    const container = document.querySelector(".searchContainer");
    const search = document.querySelector(".search");
    container.insertBefore(div, search);
    //1초가 지나면 alert가 사라짐
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  // 스켈레톤 표시
  showSkeleton() {
    const reposSkeleton = Array(this.repos_count)
      .fill("")
      .map(
        () => `
      <div class="card card-body mb-2">
        <div class="skeleton-repo-stats mb-2"></div>
        <div class="skeleton-repo-stats mb-2"></div>
        <div class="skeleton-repo-stats mb-2"></div>
      </div>
  `
      )
      .join("");
    this.profile.innerHTML = `<div class="profile-skeleton">
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <div class="skeleton-avatar img-fluid mb-2"></div>
        </div>
        <div class="col-md-9">
          <div class="skeleton-list list-group-item mb-1"></div>
          <div class="skeleton-list list-group-item mb-1"></div>
          <div class="skeleton-list list-group-item mb-1"></div>
          <div class="skeleton-list list-group-item mb-1"></div>
        </div>
      </div>
    </div>
  </div>
  ${reposSkeleton}
  `;
  }

  // 스켈레톤을 지우는 메소드
  clearSkeleton() {
    const skeleton = document.querySelector(".profile-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
  }

  //잔디 보여주기
  showCommit() {
    const gridContainer = document.querySelector(".grid-container");
    const daysIn6Months = 200; // 대략 6개월치 날짜 수

    for (let i = 0; i < daysIn6Months; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      gridContainer.appendChild(dayElement);
    }
  }
}
