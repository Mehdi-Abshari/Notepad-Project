// --Varibales
// form select
const form = document.querySelector("#form");
// paret of all notes
const noteList = document.querySelector("#note-list");

// -- Events
// submit new note
form.addEventListener("submit", newNote);
document.addEventListener("DOMContentLoaded", showSavedNotes);

// --Function
function newNote(e) {
  e.preventDefault();

  // Access to textarea value
  const noteText = document.querySelector("#note").value;

  // Craete <div> tag
  const div = document.createElement("div");
  div.innerText = noteText;
  div.classList.add("noteBox");

  // --Craete remove button (X)
  // Create <a> tag for remove button
  const removeBtn = document.createElement("a");

  // Set (X) to remove button
  removeBtn.innerText = "✖";
  // Set class for removeBtn
  removeBtn.classList.add("removeBtn");

  // Adding removeBtn to <div>
  div.appendChild(removeBtn);
  // Adding <div> to noteList
  noteList.appendChild(div);

  // Adding Data to localstorage
  addToLs(noteText);
}

function addToLs(noteText) {
  if (localStorage.getItem("historyNotes")) {
    alert("داره!");
    let arrayParsed = getLS();
    arrayParsed.push(noteText);
    let arrayStringfy = JSON.stringify(arrayParsed);
    localStorage.setItem("historyNotes", arrayStringfy);
  } else {
    alert("ندارهههههه!");

    let historyArray = [];
    historyArray.push(noteText);
    let arrayStringfy = JSON.stringify(historyArray);
    localStorage.setItem("historyNotes", arrayStringfy);
  }
}

function getLS() {
  return JSON.parse(localStorage.getItem("historyNotes"));
}

function showSavedNotes() {
  let oldNotes = getLS();

  oldNotes.forEach((eachNotes) => {
    const div = document.createElement("div");
    div.innerText = eachNotes;
    div.classList.add("noteBox");

    // --Craete remove button (X)
    // Create <a> tag for remove button
    const removeBtn = document.createElement("a");

    // Set (X) to remove button
    removeBtn.innerText = "✖";
    // Set class for removeBtn
    removeBtn.classList.add("removeBtn");

    // Adding removeBtn to <div>
    div.appendChild(removeBtn);
    // Adding <div> to noteList
    noteList.appendChild(div);
  });
}
