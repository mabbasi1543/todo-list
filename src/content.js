import DOMUtility from "./utility";
import './style.css';
import storageBridge from "./storage";
import moment from "moment";
const renderConternt = (parent) => {
    const content = DOMUtility.createElement(parent, "div", "", "grid grid-cols-10");
    renderSide(content);
    renderCategories(content);
}

const renderSide = (content) => {
    let side = "";
    if (DOMUtility.checkById("side")) {
        side = DOMUtility.createElement(content, "div", "", "col-span-2 text-slate-100 text-left bg-gray-600 flex-col justify-between p-4", "side");
    } else {
        side = DOMUtility.selectById("side")
    }

    renderFilter(content, side)
    renderCategories(content, side)


}
const renderFilter = (content, side) => {
    let filters = "";
    if (DOMUtility.checkById("filters")) {
        filters = DOMUtility.createElement(side, "div", "test", "border-b-2 border-gray-700 h-1/2 p-4", "filters");
    } else {
        DOMUtility.selectById("filters").innerHTML = "";
    }
}

const renderCategories = (content, side) => {
    let todos = "";

    if (DOMUtility.checkById("todos")) {
        todos = DOMUtility.createElement(side, "div", "", "h-1/2 p-4", "todos");
    } else {
        DOMUtility.selectById("todos").innerHTML = "";
        todos = DOMUtility.selectById("todos")
    }
    const categories = storageBridge.getData();
    const categoriesKey = Object.keys(categories);

    categoriesKey.forEach(element => {
        DOMUtility.createElement(todos, "div", categories[element]["name"], "hover:cursor-pointer font-medium m-2").addEventListener("click", (e) => {
            renderPanel(content, storageBridge.getData(), element)
        })
    });
    let data = {
        "name": "project",
        "tasks": {}
    }
    DOMUtility.createElement(todos, "div", "+", "hover:cursor-pointer font-medium m-2 text-center").addEventListener("click", (e) => {
        storageBridge.createCategory(data)
        renderCategories(content)
    })
}

const renderPanel = (content, categories, index, side) => {
    let panel = "";
    const data = categories[index]
    if (DOMUtility.checkById("panel")) {
        panel = DOMUtility.createElement(content, "div", "", "col-span-8 p-4 flex flex-col", "panel");
    } else {
        DOMUtility.selectById("panel").innerHTML = "";
        panel = DOMUtility.selectById("panel")
    }
    const header = DOMUtility.createElement(panel, "div", "", "flex justify-between text-slate-100 text-left text-2xl w-full pb-3", "header")
    DOMUtility.createElement(header, "div", data["name"], "w-fit", "title")
    const actionsHeader = DOMUtility.createElement(header, "div", "", "m-auto flex gap-5 justify-end w-full", "actionsHeader")

    const editDiv = DOMUtility.createElement(actionsHeader, "div", "")
    editDiv.addEventListener("click", (e) => {

    })

    DOMUtility.createElement(editDiv, "i", "", "fa-solid fa-pen", "edit")

    const deleteDiv = DOMUtility.createElement(actionsHeader, "div", "")
    deleteDiv.addEventListener("click", (e) => {
        storageBridge.removeCategory(index)
        renderSide(content)

    })
    DOMUtility.createElement(deleteDiv, "i", "", "fa-solid fa-trash")





    if (data != undefined) {
        const tasksKey = Object.keys(data["tasks"]);
        tasksKey.forEach(element => {
            const task = DOMUtility.createElement(panel, "div", "", "flex justify-between text-slate-100 text-left w-full p-1 px-3 hover:border-y-stone-400 hover:border-2 hover:border-solid", `${data["name"]}${element}`)

            const iconDiv = DOMUtility.createElement(task, "div", "")
            iconDiv.addEventListener("click", (e) => {
                data["tasks"][element]["status"] = !(data["tasks"][element]["status"])
                storageBridge.setTask(index, element, data["tasks"][element])
                renderPanel(content, storageBridge.getData(), index)
            })
            if (data["tasks"][element]["status"]) {
                let yes = DOMUtility.createElement(iconDiv, "i", "", "fa-solid fa-circle relative top-1 pr-1 hover:cursor-pointer");
                yes.setAttribute("aria-hidden", true)
            } else {
                let no = DOMUtility.createElement(iconDiv, "i", "", "fa-regular fa-circle relative top-1 pr-1 hover:cursor-pointer");
                no.setAttribute("aria-hidden", true)
            }

            DOMUtility.createElement(task, "div", data["tasks"][element]["text"], "w-5/6")
            DOMUtility.createElement(task, "div", moment(data["tasks"][element]["date"]).format("dddd MMMM Do YYYY"), "m-auto whitespace-nowrap")
            const actionsTask = DOMUtility.createElement(task, "div", "", "flex justify-end gap-5 w-1/6")

            const editDiv = DOMUtility.createElement(actionsTask, "div", "")
            editDiv.addEventListener("click", (e) => {

            })

            DOMUtility.createElement(editDiv, "i", "", "fa-solid fa-pen", "edit")

            const deleteDiv = DOMUtility.createElement(actionsTask, "div", "")
            deleteDiv.addEventListener("click", (e) => {
                storageBridge.removeTask(index, element)
                renderPanel(content, storageBridge.getData(), index)


            })
            DOMUtility.createElement(deleteDiv, "i", "", "fa-solid fa-trash")


        });
        DOMUtility.createElement(panel, "div", "+", "hover:cursor-pointer font-xl font-bold m-2 text-center text-slate-100 p-1 px-3 hover:border-y-stone-400 hover:border-2 hover:border-solid").addEventListener("click", (e) => {
            let newTask = {
                "text": "text",
                "date": moment().format("YYYYMMDD"),
                "status": true
            };
            storageBridge.createTask(index, newTask)
            renderPanel(content, storageBridge.getData(), index)
        })
    }
}
export default renderConternt;