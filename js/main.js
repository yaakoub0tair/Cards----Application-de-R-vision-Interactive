// Gestion du menu burger mobile
const menuBtn = document.getElementById("menuBtn");
const menuMobile = document.getElementById("menuMobile");

menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");
});
lucide.createIcons();

const el = document.getElementById("collectionsCount");
const collections = JSON.parse(localStorage.getItem("cards_collections") || "[]");
el.textContent = collections.length;