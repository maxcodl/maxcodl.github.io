const header = document.querySelector("header");
const main = document.querySelector("main");

window.addEventListener("scroll", () => {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  if (scrollPosition > 0) {
    header.style.opacity = "0";
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }
});