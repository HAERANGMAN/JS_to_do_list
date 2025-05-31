const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");

const TODOS_KEY = "todos";
const DOINGS_KEY = "doings";
const DONES_KEY = "dones";

let toDos = [];
let doings = [];
let dones = [];

// 저장 함수들
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function saveDoings() {
  localStorage.setItem(DOINGS_KEY, JSON.stringify(doings));
}

function saveDones() {
  localStorage.setItem(DONES_KEY, JSON.stringify(dones));
}

// will do → doing 으로 이동
function moveToDoing(event) {
  const li = event.target.parentElement;
  const id = parseInt(li.id);
  const text = li.querySelector("span").innerText;

  // will do 리스트에서 제거
  toDos = toDos.filter((todo) => todo.id !== id);
  saveToDos();

  // doing 리스트에 추가
  const doingObj = { text, id };
  doings.push(doingObj);
  saveDoings();

  // UI 이동
  li.remove();
  paintDoing(doingObj);
}

// doing → done 으로 이동
function moveToDone(event) {
  const li = event.target.parentElement;
  const id = parseInt(li.id);
  const text = li.querySelector("span").innerText;

  // doing 리스트에서 제거
  doings = doings.filter((item) => item.id !== id);
  saveDoings();

  // done 리스트에 추가
  const doneObj = { text, id };
  dones.push(doneObj);
  saveDones();

  // UI 이동
  li.remove();
  paintDone(doneObj);
}

// 각 리스트에 아이템 추가
function paintToDo(obj) {
  const li = document.createElement("li");
  li.id = obj.id;
  const span = document.createElement("span");
  span.innerText = obj.text;
  const btn = document.createElement("button");
  btn.innerText = "🐥";
  btn.style = "margin: 0px 10px 3px 0px";
  btn.addEventListener("click", moveToDoing);
  li.appendChild(btn);
  li.appendChild(span);
  toDoList.appendChild(li);
}

function paintDoing(obj) {
  const li = document.createElement("li");
  li.id = obj.id;
  const span = document.createElement("span");
  span.innerText = obj.text;
  const btn = document.createElement("button");
  btn.innerText = "👨🏻‍💻";
  btn.style = "margin: 0px 10px 3px 0px";
  btn.addEventListener("click", moveToDone);
  li.appendChild(btn);
  li.appendChild(span);
  doingList.appendChild(li);
}

function paintDone(obj) {
  const li = document.createElement("li");
  li.id = obj.id;
  const span = document.createElement("span");
  span.innerText = obj.text;
  const btn = document.createElement("button");
  btn.innerText = "✅";
  btn.disabled = true;
  btn.style = "margin: 0px 10px 3px 0px";
  li.appendChild(btn);
  li.appendChild(span);
  doneList.appendChild(li);
}

// 입력 처리
function handleToDoSubmit(event) {
  event.preventDefault();
  const text = toDoInput.value;
  toDoInput.value = "";
  const newObj = {
    text,
    id: Date.now()
  };
  toDos.push(newObj);
  saveToDos();
  paintToDo(newObj);
}

// 초기화: localStorage 불러오기
function loadSavedData() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  if (savedToDos) {
    toDos = JSON.parse(savedToDos);
    toDos.forEach(paintToDo);
  }

  const savedDoings = localStorage.getItem(DOINGS_KEY);
  if (savedDoings) {
    doings = JSON.parse(savedDoings);
    doings.forEach(paintDoing);
  }

  const savedDones = localStorage.getItem(DONES_KEY);
  if (savedDones) {
    dones = JSON.parse(savedDones);
    dones.forEach(paintDone);
  }
}

toDoForm.addEventListener("submit", handleToDoSubmit);
loadSavedData();
