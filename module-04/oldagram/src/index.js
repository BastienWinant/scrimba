import './style.css'

function component() {
  const element = document.createElement("h2");
  element.innerHTML = "Hello World";
  element.classList.add("black-border");
  return element;
}

document.body.appendChild(component());
