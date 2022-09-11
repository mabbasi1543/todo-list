const DOMUtility = (() => {
    const createElement = (parent, tag, text = "", classes, id) => {
        const temp = document.createElement(tag);
        if (id != undefined) {
            temp.id = id;
        }
        if (classes != undefined && classes != "") {
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
    const editById = (id) => {
        return document.getElementById(id)
    }

    const checkById = (id) => {
        let element = document.getElementById(id)
        if (element != 'undefined' && element != null) {
            return false;
        } else {
            return true;
        }
    }
    const selectById = (id) => {
        return document.getElementById(id);

    }
    return {
        createElement,
        editById,
        checkById,
        selectById,
    }
})()
export default DOMUtility;