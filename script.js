const revealNodes = document.querySelectorAll(".reveal");
const orbitChips = document.querySelectorAll(".orbit-chip");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealNodes.forEach((node) => observer.observe(node));

function focusSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  document.querySelectorAll(".highlighted").forEach((node) => {
    node.classList.remove("highlighted");
  });

  target.classList.add("highlighted");
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  orbitChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.target === sectionId);
  });

  window.setTimeout(() => target.classList.remove("highlighted"), 1800);
}

orbitChips.forEach((chip) => {
  chip.addEventListener("click", () => focusSection(chip.dataset.target));
});
