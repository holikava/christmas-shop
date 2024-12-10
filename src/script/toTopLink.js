const toTopLink = document.getElementById("to-top-btn");

toTopLink &&
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopLink.classList.add("show-btn");
    } else {
      toTopLink.classList.remove("show-btn");
    }
  });
