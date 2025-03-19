let section = document.getElementById("example");
section.addEventListener("mouseenter", () => {
  section.style.backgroundColor = "#e3e3e3";
  section.style.color = "#fff";
});
section.addEventListener("mouseleave", () => {
  section.style.backgroundColor = "#fff";
  section.style.color = "#000";
});
