window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    console.log("scrolled");
    console.log(navbar.classList);
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const searchButton = document.querySelector(".search_button");
const searchInput = document.querySelector(".searchbar");

searchButton.addEventListener("click", () => {
  searchInput.classList.toggle("show_hidden");
  searchButton.classList.toggle("show_hidden");
});

document.addEventListener("click", (e) => {
  if (e.target !== searchInput && e.target !== searchButton) {
    searchButton.classList.toggle("show_hidden");
    searchInput.classList.toggle("show_hidden");
  }
});
