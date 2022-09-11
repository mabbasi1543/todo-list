const createElement = (parent, tag, text = "", classes) => {
    const temp = document.createElement(tag);
    if (classes != undefined) {
        const classArr = classes.split(" ");
        if (classArr.length > 0) {
            classArr.forEach((item) => temp.classList.add(item))
        }
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