import './style.css';

import { Header } from "./components/header/header";
import { Post } from "./components/post/post"

console.log(Post());

document.body.insertAdjacentElement(
  "afterbegin",
  Header()
);

const mainEl = document.querySelector(".main");
mainEl.insertAdjacentElement(
  "afterbegin",
  Post()
)