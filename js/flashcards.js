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