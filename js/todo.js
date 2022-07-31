const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

//JSON.stringify() -> 스트링화
//JSON.parse() -> 오브젝트화
////////////////////////////////////////////////////////////
//[SAVING]

//항상 새 리스트에서 출발하기 떄문에 새로고침해서 입력하면 새로저장됨
//그래서 기존의 것을 가져오기 위해 const가 아니라 let으로 바꿈
let toDos = [];
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

////////////////////////////////////////////////////////////
//[DELETING]
//event는 함수가 사용되었던 이벤트에대한 값들을 저장하는 것
function deleteTodoList(event) {
  const removeList = event.target.parentElement; //이벤트.타겟하기.이벤트값중파렌트엘리먼트
  removeList.remove();
  // toDos 배열이 가진 값에 filter를 통해 삭제를 누른 toDos의 id값을 제외한
  // 다른 id를 가진 toDos는 유지시켜줌
  toDos = toDos.filter((tomato) => tomato.id !== parseInt(removeList.id));
  saveToDos();
}
// list.fliter(); // n번째에 함수값이 적용되어서나온값이 n과동일하면 리스트에남김

////////////////////////////////////////////////////////////
//[ADDING]
//createElement의 사용!
function paintToDo(newToDo) {
  const new_li = document.createElement("li");
  new_li.id = newToDo.id;
  const new_span = document.createElement("span");
  new_span.innerText = newToDo.text;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.style = "margin: 0px 10px 3px 0px";
  btn.addEventListener("click", deleteTodoList);
  new_li.appendChild(btn);
  new_li.appendChild(new_span);
  toDoList.appendChild(new_li);
}

//event는 submit이라는 이벤트에대한 값들을 저장하는 것
//이벤트 인자를 가져와서 먼저 새로고침 안되기 멈춰놓기
function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDoInput = toDoInput.value; //인풋은 여기서 저장됨
  toDoInput.value = ""; //그리고 값은 리셋
  const newToDoObj = {
    text: newToDoInput,
    id: Date.now(), //시간을 id값으로 사용
  };
  toDos.push(newToDoObj); //append가 push임
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //만약 local에 값이 있다면 변수로 돌려줌(새로고침해도 기존값저장위해)
  //arrow function : for문처럼 사용 item이 i가 됨
  //parsedToDos.forEach((item) => console.log("this is turn off item", item));
  //forEach를 통해 len(parsedToDos)만큼 (함수)실행
  parsedToDos.forEach(paintToDo);
}
