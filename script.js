
const AddNoteBtn = document.getElementById("btn");
const TextArea = document.getElementById("textArea");
const AppendHere = document.getElementById("cont");
let Numbering = 1;

// Load notes from localStorage when the page loads
window.addEventListener("load", () => {
  for (let i = 1; i <= localStorage.length; i++) {
    const noteText = localStorage.getItem(`note${i}`);
    if (noteText) {
      addNoteElement(Numbering, noteText);
      Numbering++;
    }
  }
});

AddNoteBtn.addEventListener("click", () => {
  const noteText = TextArea.value;
  if (noteText) {
    addNoteElement(Numbering, noteText);
    localStorage.setItem(`note${Numbering}`, noteText);
    Numbering++;
    TextArea.value = "";
  }
});

function addNoteElement(noteNumber, noteText) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("note");
  newDiv.innerHTML = `
  <p>${noteNumber} :</p>
  <p id="note${noteNumber}"> ${noteText}</p>`;
  AppendHere.appendChild(newDiv);

  const ButtonDiv = document.createElement("div");
  ButtonDiv.setAttribute("class", "buttons");
  ButtonDiv.setAttribute("id", `ButtonDiv${noteNumber}`);
  ButtonDiv.innerHTML = `
    <button class="button" id="E${noteNumber}">Edit Note</button>
    <button class="button" id="R${noteNumber}">Remove Note</button>
  `;
  AppendHere.appendChild(ButtonDiv);

  // Handle edit and save actions
  const editButton = document.getElementById(`E${noteNumber}`);
  const noteNum = document.getElementById(`note${noteNumber}`);

  editButton.addEventListener("click", () => {
    if (editButton.innerHTML === "Save Note") {
      noteNum.contentEditable = false;
      editButton.innerHTML = "Edit Again";
      localStorage.setItem(noteNum.id, noteNum.innerHTML);
    } else {
      noteNum.contentEditable = true;
      editButton.innerHTML = "Save Note";
    }
  });

  // Handling the remove actions
  const removeButton = document.getElementById(`R${noteNumber}`);
  removeButton.addEventListener("click", () => {
    const noteId = `note${noteNumber}`;
    localStorage.removeItem(noteId);
    const toRemove = document.getElementsByClassName("note")[`${noteNumber}`];
    const buttonDiv = document.getElementById(`ButtonDiv${noteNumber}`);
    toRemove.remove();
    buttonDiv.remove();
    Numbering--;
  });
}

const clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", () => {
  localStorage.clear();
  AppendHere.innerHTML = `
  <div class="note">
    <textarea id ="textArea" rows="4" placeholder="Enter your note here"></textarea>
    <button id ="btn">Add Note</button>
    <button id = "clearAll">Clear All Notes</button>
  </div>
  `
  location.reload();
})