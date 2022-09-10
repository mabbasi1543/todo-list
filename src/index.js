import './style.css';
import renderHeader from "./header"
import renderFooter from './footer';
import renderConternt from './content';

const container = document.getElementById("container");


renderHeader(container)
renderConternt(container)
renderFooter(container)

