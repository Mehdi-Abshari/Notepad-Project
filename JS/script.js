// --Varibales
// Form select
const form = document.querySelector("#form");
// Paret of all notes
const noteList = document.querySelector("#note-list");
// selecting #add-new for alert
const addNew = document.querySelector("#add-new");
// Selecting #trash for alert
const trash = document.querySelector("#trash");

// -- Events
// Show pased note
document.addEventListener("DOMContentLoaded", showSavedNotes);
// Submit new note
form.addEventListener("submit", newNote);
// Remove button
noteList.addEventListener("click", removeNote);
// Alert for add new widget
addNew.addEventListener("click", addNewAlert);
// Alert for trash widget
trash.addEventListener("click", trashAlert);

// --Function
// addNewAlert function for alert
function addNewAlert() {
  alert(
    "You must fill out the form and click at submit button to create new note !"
  );
}
// trashAlert function for alert
function trashAlert() {
  alert('You must click at "✖" in your note to trash the note !');
}
// New note function
function newNote(e) {
  e.preventDefault();

  // note data varibale for title and text value
  let noteData = { title: "", text: "" };

  // Access to textarea value
  noteData.text = document.querySelector("#note").value;
  // Access to title input value
  noteData.title = document.querySelector("#title").value;

  // Create new note layot
  createUINote(noteData);

  // Adding Data to localstorage
  addToLs(noteData);
}

// Remove button function
function removeNote(e) {
  if (e.target.classList.contains("removeBtn")) {
    e.target.parentElement.remove();

    // Select value in localstorage
    removeFromLS(e.target.parentElement.textContent);
  }
}

// Remove note value from localstorage function
function removeFromLS(noteText) {
  // remove note text and title from localstorage without remove button
  let cleanNoteText = noteText.substring(0, noteText.length - 1);

  // old notes varibale
  let oldNotes = getLS();
  oldNotes.forEach((eachNote, noteIndex) => {
    if (eachNote == cleanNoteText) {
      oldNotes.splice(noteIndex, 1);
    }
  });
  // -- Set item to localstorage
  // Convert to JSON and stringfy oldNotes
  localStorage.setItem("historyNotes", JSON.stringify(oldNotes));

  // getLS function to get from localstorage
  getLS();
}

// Add to localstorage function
function addToLs(noteText) {
  if (localStorage.getItem("historyNotes")) {
    // arrayParsed varibale
    let arrayParsed = getLS();

    // Pushing arrayParsed to noteText
    arrayParsed.push(noteText);

    // ArrayStringfy varibale
    // Convert JSON and stringfy arrayParsed
    let arrayStringfy = JSON.stringify(arrayParsed);

    // Set item arrayStringfy to localstorage
    localStorage.setItem("historyNotes", arrayStringfy);
  } else {
    // Vacant array to to save note text into them
    let historyArray = [];

    // Pushing noteText to historyArray
    historyArray.push(noteText);

    // Covert JSON and stringify historyArray
    let arrayStringfy = JSON.stringify(historyArray);

    // Set item arrayStringfy to localstorage
    localStorage.setItem("historyNotes", arrayStringfy);
  }
}

function getLS() {
  return JSON.parse(localStorage.getItem("historyNotes"));
}

function showSavedNotes() {
  let oldNotes = getLS();
  oldNotes.forEach((eachNote) => {
    createUINote(eachNote);
  });
}
// Create new note layot function
function createUINote(noteValue) {
  // Create <div> tag
  const div = document.createElement("div");
  // Set class for div
  div.classList.add("noteBox");

  // Create <img> tag
  const img = document.createElement("img");
  // Set attribute for <img> tag
  img.setAttribute("src", "../Images/icons8-note-48.png");
  // Set class for <img> tag
  img.classList.add("image");
  // Appending img to div
  div.appendChild(img);

  // Create <h2> tag to save note title into them
  const h2 = document.createElement("h2");
  // Adding h2 to div
  div.appendChild(h2);

  // Create <p> tag to save note text into them
  const p = document.createElement("p");
  // Adding p to div
  div.appendChild(p);

  // Adding note value title into the h2
  h2.innerHTML = noteValue.title;
  // Adding note value text into the p
  p.innerHTML = noteValue.text;

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
}
