const toTopLink = document.getElementById("to-top-link");

toTopLink &&
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopLink.classList.add("show-link");
    } else {
      toTopLink.classList.remove("show-link");
    }
  });
