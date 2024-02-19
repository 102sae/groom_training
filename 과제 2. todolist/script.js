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

  // 로컬스토리지에 저장
  saveToLocalStorge();
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

  // input 작성시 item.text에 값 할당
  inputEl.addEventListener("input", (e) => {
    item.text = e.target.value;
    saveToLocalStorge();
  });
  console.log(todos);
  //input 수정 방지 이벤트
  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocalStorge();
  });
  //input 엔터 이벤트
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      inputEl.setAttribute("disabled", "");
    }
    saveToLocalStorge();
  });
  //checkbox 클릭 이벤트
  checkbox.addEventListener("change", (e) => {
    item.complete = e.target.checked;
    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }
    saveToLocalStorge();
  });
  //수정 버튼 클릭
  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
    saveToLocalStorge();
  });
  //삭제 버튼 클릭
  removeBtnEl.addEventListener("click", () => {
    itemEl.remove();
    todos = todos.filter((todo) => todo.id !== item.id);
    saveToLocalStorge();
  });

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function saveToLocalStorge() {
  localStorage.setItem("my_todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("my_todos");
  if (data) {
    todos = JSON.parse(data);
  }
}

function displayTodos() {
  loadFromLocalStorage();
  todos.forEach((todo) => {
    const { itemEl } = createTodoElement(todo);
    list.append(itemEl);
  });
}

displayTodos();
