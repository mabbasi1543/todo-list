import DOMUtility from "./utility";

import './style.css';

const renderHeader = (parent) => {
    const div = DOMUtility.createElement(parent, "div", "ToDo", "p-3 text-2xl font-Lobster font-medium text-slate-100 text-left bg-gray-500");
}

export default renderHeader;