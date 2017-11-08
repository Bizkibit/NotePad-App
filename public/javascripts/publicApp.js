window.onload = function()  {
  displayNotes();
  // let form = document.querySelector('#new-note-form');
  let button = document.querySelector('button');
  button.addEventListener('click', newNote )
    // let body = document.querySelector('body');
    // let html = document.querySelector('html');
    // body.style.filter = "blur(5px)";
    // // let {parentElement} = e.target;
    // let popUp = newNoteBox();
    // html.appendChild(popUp);
    // let cancelButton = document.querySelector('#cancel');
    // popUp.firstElementChild.addEventListener('submit', saveChangesNew);
    // cancelButton.addEventListener('click', cancelChanges)


  // form.addEventListener('submit', function(e) {
  // 	e.preventDefault();
  // 	let {currentTarget} = e;
  // 	let fData = new FormData(currentTarget);
  // 	fetch('/notes', {
  // 		method: 'POST',
  // 		body: fData
  // 	}).then(displayNotes);
  //   currentTarget.reset();
  // });

}

function getNotes() {
  return fetch('/notes').then(res => res.json());
}

function renderNotes(notes)  {
  let board = document.querySelector('.board');
  let notesHTML = notes.map( note => {
    return `
      <div class="note" id="note-${note.id}">
        <h3>${note.title}</h3>
        <input class="delete" type="button" name="deleteButton" value="X">
        <input class="pin" type="button" name="pinButton">
        <button class="star" name="starButton"><i class="fa fa-star-o" aria-hidden="true"></i></button>
        <p>${note.content}</p>
      </div>
    `
  }).join('')
  board.innerHTML = notesHTML;
}

function displayNotes() {
  getNotes()
  .then(renderNotes)
  .then(function() {
    personalizeNotes();
    let notes = document.querySelectorAll('.note');
    let deleteButtons = document.querySelectorAll('.delete');
    let starButtons = document.querySelectorAll('.star');
    let contents = document.querySelectorAll('.note>p, .note>h3');
    let pinButtons = document.querySelectorAll('.pin');
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteNotes));
    contents.forEach(content => content.addEventListener('dblclick', EditNotes));
    pinButtons.forEach(pin => pin.addEventListener('mousedown', pinMove));
    starButtons.forEach(starButton => starButton.addEventListener('click', starNotes));
  })
}

function personalizeNotes() {
  if (document.cookie !== "") {
    let notes = document.cookie.split(';');
    notes = notes.map(function(note){return note.split('=')})
    notes.forEach(note => {
      let node = document.querySelector(`#${note[0].trim()}`);
      let coordinates = JSON.parse(note[1]);
      node.style.position = 'absolute';
      node.style.top = `${coordinates.x}px`;
      node.style.left = `${coordinates.y}px`;
      node.style.zIndex = "1";
    })
  }
}

function deleteNotes(e)  {
  e.stopPropagation();
  let {currentTarget} = e;
  let id = currentTarget.parentElement.id.split('-')[1];
  delete_cookie(`${currentTarget.parentElement.id}`)
  fetch(`/notes/${id}`, {
    method: 'delete'
  })
  .then(displayNotes);
}

  function EditNotes(e)  {
  let body = document.querySelector('body');
  let html = document.querySelector('html');
  body.style.filter = "blur(5px)";
  let {parentElement} = e.target;
  let popUp = editBox(parentElement);
  html.appendChild(popUp);
  // let saveButton = document.querySelector('#save');
  let cancelButton = document.querySelector('#cancel');
  popUp.firstElementChild.addEventListener('submit', saveChanges);
  cancelButton.addEventListener('click', cancelChanges)
}


function saveChanges(event) {
  event.preventDefault();
  // let {parentElement} = event.currentTarget;
  let {currentTarget} = event;
  let fData = new FormData(currentTarget);
  let id = currentTarget.dataset.noteId.split('-')[1];
  fetch(`/notes/${id}`, {
    method: 'PATCH',
    body: fData
  })
  .then(note => {
      currentTarget.parentElement.remove();
      let body = document.querySelector('body');
      body.style.filter = "";
  })
  .then(displayNotes);
}

function editBox(parentElement)  {
  let editBox = document.createElement('div');
  editBox.id = "editBox"
  editBox.classList.add('note');
  editBoxHTML = `
    <form class='edit-note-form' data-note-id="${parentElement.id}">

        <input type="text" name="title" id="title"
        value="${parentElement.firstElementChild.textContent}" placeholder="Title">

        <textarea name="content" id="content" placeholder="Create a new note" wrap="soft"
        required>${parentElement.lastElementChild.textContent}</textarea>

        <input type="submit" id="save" value="Save">
        <input type="button" id="cancel" value="Cancel">

    </form>
  `
  editBox.innerHTML = editBoxHTML;
  return editBox
}

function cancelChanges(e)  {
  let editBox = e.target.parentElement.parentElement;
  editBox.remove();
  let body = document.querySelector('body');
  body.style.filter = "";
}

function pinMove(e)  {
  // let {target:[{parentElement: parentElement}]} = e;
  let {target} = e;
  let {parentElement} = e.target;
  let board = document.querySelector('.board');
  // let {top:pinTop, left:pinLeft} =target.getBoundingClientRect();
  let {height: noteH, width: noteL} = parentElement.getBoundingClientRect();
  board.addEventListener('mousemove', function MM(event) {
    let [noteTop, noteLeft] = [event.pageY-0.25*noteH, event.pageX-0.7*noteL]
    parentElement.style.position= "absolute";
    parentElement.style.zIndex= "1";
    parentElement.style.top= `${noteTop}px`;
    parentElement.style.left= `${noteLeft}px`;
    target.addEventListener('mouseup', ()=>{
      board.removeEventListener('mousemove', MM);
      document.cookie = `${parentElement.id}={"x":${noteTop}, "y":${noteLeft}}`
    });
  })
}

function newNote(e)  {
  // let body = document.querySelector('body');
  let {body} = document;
  let html = document.querySelector('html');
  body.style.filter = "blur(5px)";
  // let {parentElement} = e.target;
  let popUp = newNoteBox();
  html.appendChild(popUp);
  let cancelButton = document.querySelector('#cancel');
  popUp.firstElementChild.addEventListener('submit', saveChangesNew);
  cancelButton.addEventListener('click', cancelChanges)
}

function newNoteBox()  {
  let newBox = document.createElement('div');
  newBox.classList.add('note');
  newBox.id = "editBox";
  newBoxHTML = `
    <form class='edit-note-form'>

        <input type="text" name="title" id="title"
        placeholder="Title">

        <textarea name="content" id="content" placeholder="Create a new note" wrap="soft"
        required></textarea>

        <input type="submit" id="save" value="Save">
        <input type="button" id="cancel" value="Cancel">

    </form>
  `;
  newBox.innerHTML = newBoxHTML;
  return newBox
}

function saveChangesNew(event) {
  event.preventDefault();
  // let {parentElement} = event.currentTarget;
  let {currentTarget} = event;
  let fData = new FormData(currentTarget);
  fetch(`/notes`, {
    method: 'POST',
    body: fData
  })
  .then(note => {
      currentTarget.parentElement.remove();
      let body = document.querySelector('body');
      body.style.filter = "";
  })
  .then(displayNotes);
}

const delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function starNotes(e)  {
  let {parentElement} = e.currentTarget;
  parentElement.classList.toggle("starred");
  if (parentElement.classList.contains("starred"))  {
    e.currentTarget.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>`
  } else {
    e.currentTarget.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>`
  }
}
