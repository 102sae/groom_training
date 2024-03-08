import List from "../models/List";
interface DOMList {
  ui: HTMLUListElement;
  clear(): void;
  render(fullList: List): void;
}
export default class ListTemplate implements DOMList {
  ui: HTMLUListElement;

  static instance = new ListTemplate();

  private constructor() {
    this.ui = document.querySelector("ul") as HTMLUListElement;
  }

  clear(): void {
    this.ui.innerHTML = "";
  }

  render(fullList: List): void {
    this.clear();

    fullList.list.forEach((item) => {
      const liEl = document.createElement("li") as HTMLLIElement;
      liEl.className = "item";

      const checkEl = document.createElement("input") as HTMLInputElement;
      checkEl.type = "checkbox";
      checkEl.checked = item.checked;
      checkEl.id = item.id;
      liEl.appendChild(checkEl);

      checkEl.addEventListener("change", () => {
        item.checked = !checkEl.checked;
        fullList.save();
      });

      const labelEl = document.createElement("label") as HTMLLabelElement;
      labelEl.htmlFor = item.id;
      labelEl.textContent = item.item;
      liEl.appendChild(labelEl);

      const buttonEl = document.createElement("button") as HTMLButtonElement;
      buttonEl.textContent = "X";
      buttonEl.className = "button";
      liEl.appendChild(buttonEl);

      buttonEl.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });
      this.ui.append(liEl);
    });
  }
}
