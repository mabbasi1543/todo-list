import DOMUtility from "./utility";
import './style.css';

const renderFooter = (parent) => {
    const div = DOMUtility.createElement(parent, "div", "Designed by SottaByte", "p-3 text-xl font-Lobster font-medium text-slate-100 text-center bg-gray-500");
}

export default renderFooter;