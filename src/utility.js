const createElement = (parent, tag, text = "", ...classes) => {
    const temp = document.createElement(tag);
    if (classes.length > 0) {
        classes.forEach((item) => temp.classList.add(item))
    }
    if (text == "") {
        parent.appendChild(temp)
    } else {
        temp.innerText = text
        parent.appendChild(temp)
    }
    return (temp)
}


export default createElement;