const burgerMenuIcon = document.getElementById("burger-menu-icon");
const navList = document.getElementById("nav-list");
const headerLinks = document.querySelectorAll(".nav-list__link-wrapper");

burgerMenuIcon.addEventListener("click", () => {
  burgerMenuIcon.classList.toggle("close");
  navList.classList.toggle("show-mobile-nav");
  document.body.classList.toggle('no-scroll');
});

headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("show-mobile-nav");
    burgerMenuIcon.classList.remove("close");
    document.body.classList.remove('no-scroll');
  });
});

window.addEventListener('resize', () => {
  if (document.body.clientWidth > 768) {
    navList.classList.remove("show-mobile-nav");
    burgerMenuIcon.classList.remove("close");
    document.body.classList.remove('no-scroll');
  }
})
