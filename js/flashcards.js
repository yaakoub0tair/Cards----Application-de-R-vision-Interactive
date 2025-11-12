const LS_KEY = "cards_collections";
let collections = JSON.parse(localStorage.getItem(LS_KEY)) || [];
let currentId = null,
    index = 0,
    flipped = false;

const save = () => localStorage.setItem(LS_KEY, JSON.stringify(collections));
const getCol = id => collections.find(c => c.id === id);

const collectionsList = document.getElementById("collectionsList");
const studyArea = document.getElementById("studyArea");
const newCollectionInput = document.getElementById("newCollection");
const addCollectionBtn = document.getElementById("addCollection");
const addCardBtn = document.getElementById("addCardBtn");
const selectCollection = document.getElementById("selectCollection");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const saveCardBtn = document.getElementById("saveCard");
const cardModal = document.getElementById("cardModal");
const closeModal = document.getElementById("closeModal");


function renderCollections() {
    collectionsList.innerHTML = "";
    selectCollection.innerHTML = "";

    if (collections.length === 0) {
        collectionsList.innerHTML = "<p class='text-gray-400 text-sm'>Aucune collection</p>";
        addCardBtn.disabled = true;
        return;
    }

    addCardBtn.disabled = false;

    collections.forEach(c => {
        const div = document.createElement("button");
        div.className = "flex justify-between items-center bg-slate-100 p-4 rounded-lg text-left hover:bg-slate-200 transition";
        div.innerHTML = `<div><p class='font-bold text-base text-gray-800'>${c.title}</p>
        <p class='text-sm text-gray-500 mt-1'>${(c.cards||[]).length} carte(s)</p></div>
        <i data-lucide='chevron-right' class='w-5 h-5 text-gray-400'></i>`;
        div.addEventListener("click", () => { currentId = c.id;
            showCard(0, false); });
        collectionsList.appendChild(div);

        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.title;
        selectCollection.appendChild(opt);
    });
    lucide.createIcons();
}