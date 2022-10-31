/*Add new todo */

const inp = document.querySelector(".input-container input");
const form = document.querySelector("form");
const todoContainer = document.querySelector(".todo-list-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const todo = inp.value.trim();

  if (!todo) return;

  createLiNode(todo);

  inp.value = "";
});

/*todo remove btn*/

const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach((btn) => {
  btn.addEventListener("click", todoRemover);
});

function todoRemover() {
  this.parentNode.remove();
}

/*sort todo*/
const sortBtn = document.querySelector(".sort-btn__button");

sortBtn.addEventListener("click", function () {
  this.classList.toggle("active");

  let liNodeTexts = [
    ...document.querySelectorAll(".todo-list-container li"),
  ].map((element) => element.innerText);

  liNodeTexts.sort((a, b) =>
    this.classList.contains("active") ? a.localeCompare(b) : b.localeCompare(a)
  );

  document
    .querySelectorAll(".todo-list-container li")
    .forEach((element) => element.remove());
  liNodeTexts.forEach((element) => createLiNode(element));
});

/* Create Li Node */

function createLiNode(text) {
  const liNode = document.createElement("li");
  liNode.setAttribute("draggable", true);
  liNode.classList.add("draggable");
  const textNode = document.createTextNode(text);
  addEventsDragAndDrop(liNode);

  const removeBtn = document.createElement("span");
  removeBtn.classList.add("remove-btn");
  removeBtn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  removeBtn.addEventListener("click", todoRemover);

  liNode.append(textNode);
  liNode.append(removeBtn);
  todoContainer.append(liNode);
}

/* Drag And Drop Algorithm */

var remove = document.querySelector(".draggable");

function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  this.children[0].addEventListener("click", todoRemover);
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
  this.children[0].addEventListener("click", todoRemover);
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}

var listItens = document.querySelectorAll(".draggable");

[].forEach.call(listItens, function (item) {
  addEventsDragAndDrop(item);
});
