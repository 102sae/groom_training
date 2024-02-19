const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];

//추가 버튼 클릭시 실행
createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  // 새로운 아이템 객체 생성
  const item = {
    id: new Date().getTime(), //유니크한 값으로 id를 생성
    text: "",
    complete: false,
  };

  // 할일 배열 처음에 새로운 아이템을 추가
  todos.unshift(item);

  // html 요소 생성하기
  const { itemEl, inputEl } = createTodoElement(item);

  // 리스트 요소 안에 방금 생성한 아이템 요소 추가(가장 첫번째 요소로 추가)
  list.prepend(itemEl);

  // 바로 타이핑 할수 있도록disabled 속성 제거
  inputEl.removeAttribute("disabled");
  inputEl.focus();
}

function createTodoElement(item) {
  //todo 컨테이너
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  //수정,삭제 버튼 생성
  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-icons");
  editBtnEl.innerText = "edit";

  const removeBtnEl = document.createElement("button");
  removeBtnEl.classList.add("material-icons", "remove-btn");
  removeBtnEl.innerText = "remove_circle";

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}
