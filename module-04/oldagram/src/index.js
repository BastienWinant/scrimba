import './style.css';

import { Header } from "./components/header/header";

// const mainEl = document.querySelector('main');
document.body.insertAdjacentElement(
  "afterbegin",
  Header()
);
