/* 
    name: Notepad project java script;
    developer: Mehdi Abshari;
    production date: 1401-09-23;
    description: ... ;
*/
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

// Function for remove button function
function removeNote(e) {
  // If user click at remove button
  if (e.target.classList.contains("removeBtn")) {
    // remove parent element
    e.target.parentElement.remove();

    // Select value in localstorage
    removeFromLS(e.target.parentElement.textContent);
  }
}

// Function for remove note value from localstorage function
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

// Function for get data from localStorage
function getLS() {
  // get data from localStorage
  return JSON.parse(localStorage.getItem("historyNotes"));
}

// Function for show saved notes from localStorage
function showSavedNotes() {
  // Create varibale for old notes
  let oldNotes = getLS();
  // We call oldNotes to going to createUINote
  oldNotes.forEach((eachNote) => {
    createUINote(eachNote);
  });
}

// Function for create new note layot
function createUINote(noteValue) {
  // Create <div> tag
  const div = document.createElement("div");
  // Set class for div
  div.classList.add("noteBox");
  // Set style for noteBox
  div.style.cssText =
    "background: #dff1ff; display: flex; flex-direction: column; width: max-content; min-width: 200px; max-width: 320px; padding: 20px 20px 25px 20px; margin: 20px; border-radius: 4px; position: relative;";

  // Create <img> tag
  const img = document.createElement("img");
  // Set attribute for <img> tag
  img.setAttribute("src", "../Images/post.png");
  // Set class for <img> tag
  img.classList.add("image");
  // Set style for image
  img.style.width = "50px";
  // Appending img to div
  div.appendChild(img);

  // Create <h2> tag to save note title into them
  const h2 = document.createElement("h2");
  // Set style for h2
  h2.style.cssText =
    "font-family: Montserrat-Bold, Arabic; font-size: 23px; padding-top: 10px;";
  // Adding h2 to div
  div.appendChild(h2);

  // Create <p> tag to save note text into them
  const p = document.createElement("p");
  // Set style for p
  p.style.cssText = "font-family: Montserrat-Med, Arabic; font-size: 16px; color: rgb(39, 39, 39); padding-top: 10px;";
  // Adding p to div
  div.appendChild(p);

  // Adding note value title into the h2
  h2.innerHTML = noteValue.title;
  // Adding note value text into the p
  p.innerHTML = noteValue.text;

  // --Craete remove button img
  // Create <a> tag for remove button
  const removeBtn = document.createElement("a");
  // Set style for removeBtn
  removeBtn.style.cssText =
    "background: rgb(31, 31, 31, 0.8); border-radius: 4px 0 4px 0; padding: 0 3.5px; cursor: pointer; position: absolute; right: 0; bottom: 0;";

  // Create <img> for remove button
  const removeImg = document.createElement("img");
  // Set attribute for <img> tag
  removeImg.setAttribute("src", "../Images/icons8-close.svg");
  // Set style for removeImg
  removeImg.style.width = "12px";
  // Set class for removeImg
  removeImg.classList.add("removeImg");
  // Appending removeImg to removeBtn
  removeBtn.appendChild(removeImg);

  // Set class for removeBtn
  removeBtn.classList.add("removeBtn");

  // Adding removeBtn to <div>
  div.appendChild(removeBtn);
  // Adding <div> to noteList
  noteList.appendChild(div);
}
