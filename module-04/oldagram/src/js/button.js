export default class Button {
  constructor(imgPath) {
    this.imgPath = imgPath;
  }

  createElement() {
    const btnEl = document.createElement("button");
    btnEl.classList.add("btn", "centered-content", "no-padding");
    btnEl.type = "button";

    const imgEl = document.createElement("img");
    imgEl.classList.add("img", "btn-img");
    imgEl.src = this.imgPath;
    btnEl.appendChild(imgEl);

    return btnEl;
  }
}