//code for sidebar
document
  .getElementsByClassName("hamburger")[0]
  .addEventListener("click", (evt) => {
    document.getElementsByClassName("nav-links")[0].style.width = "220px";
  });
document
  .getElementsByClassName("CloseBTN")[0]
  .addEventListener("click", (evt) => {
    document.getElementsByClassName("nav-links")[0].style.width = "0";
  });
