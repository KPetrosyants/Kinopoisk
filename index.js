const burgerButton = document.querySelector(".burger");
const menuBurger = document.querySelector(".menu__list");
const content = document.querySelector(".content");
const body = document.querySelector("body");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("active");
  menuBurger.classList.toggle("active");
  content.classList.toggle("blur");
  body.classList.toggle("lock");
});
window.addEventListener("resize", (e) => {
  if (window.innerWidth >= 750) {
    console.log(e);
    console.log(window.innerWidth);
    burgerButton.classList.remove("active");
    menuBurger.classList.remove("active");
    content.classList.remove("blur");
  }
});
