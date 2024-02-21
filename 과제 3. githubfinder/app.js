import { Github } from "./github.js";
import { UI } from "./ui.js";
const github = new Github();
const ui = new UI();

const searchUser = document.getElementById("search-user");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;

  if (userText !== "") {
    ui.showSkeleton(); //데이터 로딩될때까지 스켈레톤 UI 표시

    github.getUser(userText).then((data) => {
      if (data.profile.message === "Not Found") {
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
      ui.clearSkeleton(); // 데이터 로딩 완료 후 스켈레톤 UI 숨기기
    });
  } else {
    ui.clearProfile();
  }
});
