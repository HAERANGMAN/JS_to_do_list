const loginForm3 = document.querySelector("#login-form");
const loginInput4 = document.querySelector("#login-form input");
const h1_name = document.querySelector("#greeting");
const logout = document.querySelector("#logout");

const REMOVE_CLASSNAME = "hidden"; //별로 중요하지 않은 변수는 모두 대문자로
const USERNAME_KEY = "username";

// 폼을 지우고 h1을 서로 교차해서 보이도록...
function disappearSubmit(event) {
  event.preventDefault();
  const username = loginInput4.value;
  localStorage.setItem(USERNAME_KEY, username);
  loginForm3.classList.add(REMOVE_CLASSNAME);
  paintGreetings();
  //   h1_name.innerText = `Hello ${}!`;
  //   h1_name.classList.remove(REMOVE_CLASSNAME);
}

function paintGreetings() {
  username = localStorage.getItem(USERNAME_KEY);
  h1_name.classList.remove(REMOVE_CLASSNAME);
  logout.classList.remove(REMOVE_CLASSNAME);
  h1_name.innerText = `Hello ${username}!`; //f'{}'과 같은기능 대신 백쿼트사용
}

const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
  loginForm3.classList.remove(REMOVE_CLASSNAME);
} else {
  paintGreetings();
  //   h1_name.innerText = `Hello ${saveUsername}!`;
  //   h1_name.classList.remove(REMOVE_CLASSNAME);
}

function removeLocal() {
  localStorage.clear();
  h1_name.classList.add(REMOVE_CLASSNAME);
  logout.classList.add(REMOVE_CLASSNAME);
  loginForm3.classList.remove(REMOVE_CLASSNAME);
  loginInput4.value = null;
}

loginForm3.addEventListener("submit", disappearSubmit);
logout.addEventListener("click", removeLocal);
