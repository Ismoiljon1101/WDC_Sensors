const toggleButton = document.querySelector("#toggle-button");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.getElementById("main-content").classList.toggle("main-content-dark");

  const headerFooter = Array.from(
    document.getElementsByClassName("header-footer")
  );

  if (headerFooter[0].classList.contains("dark-mode")) {
    headerFooter.forEach((item) => {
      item.classList.toggle("dark-mode");
      item.style.backgroundColor = "white";
      item.style.color = "black";
    });
  } else {
    headerFooter.forEach((item) => {
      item.classList.toggle("dark-mode");
      item.style.backgroundColor = "black";
      item.style.color = "white";
    });
  }
});
