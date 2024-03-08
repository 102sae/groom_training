import List from "./models/List";
import ListItem from "./models/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const listInstance = List.instance;
  const ListTemplateInstance = ListTemplate.instance;

  const itemForm = document.querySelector("form") as HTMLFormElement;
  itemForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const input = document.querySelector("input") as HTMLInputElement;
    const newText = input.value.trim();
    if (!newText.length) return;
    const itemId = listInstance.list.length
      ? parseInt(listInstance.list[listInstance.list.length - 1].id) + 1
      : 1;
    const newListItem = new ListItem(itemId.toString(), newText, false);
    //list에 새 아이템 추가
    listInstance.addItem(newListItem);
    input.value = "";
    ListTemplateInstance.render(listInstance);
  });

  const clearButton = document.getElementById(
    "clear-items-button"
  ) as HTMLButtonElement;
  clearButton.addEventListener("click", () => {
    listInstance.clearList();
    ListTemplateInstance.clear();
  });
  //초기 데이터 로드
  listInstance.load();
  //생성된 데이터를 이용해서 화면에서 보여주기
  ListTemplateInstance.render(listInstance);
};

initApp();
