import { Github } from "./github.js";
import { UI } from "./ui.js";
const github = new Github();
const ui = new UI();

const searchUser = document.getElementById("search-user");

searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value;

  if (userText !== "") {
    github.getUser(userText).then((data) => {
      if (data.profile.message === "Not Found") {
        console.log("User not found");
      } else {
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  }
});
