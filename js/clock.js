const clock = document.querySelector("h2#clock");

function sayHello() {
  console.log("hello");
}

// setInterval(sayHello, 500); // 인터벌로 계속 출력
// setTimeout(sayHello, 1000); // 대기후 1회 출력

function getClock() {
  const today = new Date();
  const Hours = String(today.getHours()).padStart(2, "0"); // 자리수, 빈자리에넣을 숫자, str가능
  const Minutes = String(today.getMinutes()).padStart(2, "0");
  const Seconds = String(today.getSeconds()).padStart(2, "0"); //padEnd로도 가능함
  const mSeconds = String(today.getMilliseconds()).padStart(2, "0"); //substr(0, 2)로 자리수 조정가능
  clock.innerText = `${Hours}:${Minutes}:${Seconds}:${mSeconds}`;
}

getClock(); // 시계 바로 볼수있음
setInterval(getClock, 1); //그다음에 업데이트
