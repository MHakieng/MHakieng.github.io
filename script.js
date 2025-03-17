document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("aside");
    const menuButton = document.createElement("button");
    menuButton.innerText = "☰";
    menuButton.classList.add("menu-btn");
    document.body.appendChild(menuButton);
  
    const mainContent = document.querySelector(".main-content");
  
    menuButton.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      mainContent.classList.toggle("shift");
    });
  });
  