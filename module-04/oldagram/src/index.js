import './style.css';

import { Header } from "./components/header/header";
import { Post } from "./components/post/post"

document.body.insertAdjacentElement(
  "afterbegin",
  Header()
);
