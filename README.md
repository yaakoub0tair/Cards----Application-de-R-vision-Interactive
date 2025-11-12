# 🃏 Cards — Application de Révision Interactive

> Une application web simple et moderne pour apprendre à travers des **flashcards** et **quiz interactifs**.  
> Développée avec **HTML5**, **Tailwind CSS**, et **JavaScript (ES6)**, les données sont stockées localement via `localStorage` et des fichiers JSON.

---

## 🚀 Aperçu du projet

**Cards** permet aux utilisateurs de :
- Créer leurs **collections de flashcards**
- Réviser leurs cartes via un **mode interactif**
- Tester leurs connaissances avec des **quiz** tirés de fichiers JSON
- Sauvegarder leurs progrès localement (aucun backend requis)

---

## 🧱 Structure du projet

cards-app/
│
├── index.html # Page d’accueil
├── flashcards.html # Page de gestion et révision des flashcards
├── quiz.html # Page des quiz
│
├── data/
│ └── quizzes.json # Base de données des quiz
│
├── js/
│ ├── main.js # Script global (navigation, utils)
│ ├── flashcards.js # Gestion des collections et flashcards
│ └── quiz.js # Gestion du mode quiz
│
├── css/
│ ├── input.css # Fichier source Tailwind
│ └── style.css # Fichier CSS généré par Tailwind
│
├── tailwind.config.js # Configuration Tailwind CLI
├── package.json # Dépendances & scripts NPM
└── README.md # Documentation du projet

---

## ⚙️ Installation & Configuration

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/cards-app.git
cd cards-app

2. Installer Tailwind via CLI
npm install -D tailwindcss
npx tailwindcss init
3. Configurer Tailwind
Dans tailwind.config.js :
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: { extend: {} },
  plugins: [],
}
4. Compiler Tailwind
Ajoute ce script dans ton package.json :
"scripts": {
  "build:css": "npx tailwindcss -i ./css/input.css -o ./css/style.css --watch"
}
Crée le fichier css/input.css :
@tailwind base;
@tailwind components;
@tailwind utilities;
Et exécute :
npm run build:css
🧠 Fonctionnalités principales
🏠 Page d’accueil (index.html)
Présente le projet et les modes disponibles.
Affiche le nombre de collections disponibles dans localStorage.
🗂️ Flashcards (flashcards.html)
Créer une collection avec un titre.
Ajouter des cartes (question / réponse).
Retourner les cartes au clic.
Navigation entre cartes.
Sauvegarde automatique dans localStorage (cards_collections).
🧩 Quiz (quiz.html)
Charge les quiz depuis data/quizzes.json.
Affiche les questions selon leur type :
text → champ de saisie libre.
true_false → boutons “Vrai / Faux”.
Feedback immédiat et score final.
Sauvegarde du meilleur score dans localStorage (best_scores).