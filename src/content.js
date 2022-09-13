import DOMUtility from "./utility";
import './style.css';
import storageBridge from "./storage";
import moment from "moment";
import { Document } from "postcss";
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
    const headerText = DOMUtility.createElement(header, "div", data["name"], "w-fit whitespace-nowrap", "title")
    const actionsHeader = DOMUtility.createElement(header, "div", "", "m-auto flex gap-5 justify-end w-full", "actionsHeader")

    const editDiv = DOMUtility.createElement(actionsHeader, "div", "")
    editDiv.addEventListener("click", (e) => {
        headerText.style.visibility = "hidden";
        actionsHeader.style.visibility = "hidden";
        const inputDiv = DOMUtility.createElement(header, "form", "", "absolute w-1/3 h-9 bg-transparent", "inputDiv");
        const inputText = DOMUtility.createElement(inputDiv, "input", "", "w-4/6 rounded-md bg-gray-600 pl-2", "inputText");
        inputText.value = data["name"]
        const inputBtn = DOMUtility.createElement(inputDiv, "buttton", "save", "ml-1 px-1 w-fit m-auto rounded-md bg-gray-500 hover:cursor-pointer", "inputBtn");
        inputBtn.setAttribute("type", "submit")
        inputBtn.addEventListener("click", (e) => {
            data["name"] = inputText.value;
            storageBridge.setCategory(index, data);
            renderSide(content);
            renderPanel(content, storageBridge.getData(), index);

        })
    })

    DOMUtility.createElement(editDiv, "i", "", "fa-solid fa-pen", "edit")

    const deleteDiv = DOMUtility.createElement(actionsHeader, "div", "")
    deleteDiv.addEventListener("click", (e) => {
        storageBridge.removeCategory(index);
        renderSide(content);
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

            const taskText = DOMUtility.createElement(task, "div", data["tasks"][element]["text"], "w-5/6")
            const taskDate = DOMUtility.createElement(task, "div", moment(data["tasks"][element]["date"]).format("dddd MMMM Do YYYY"), "m-auto whitespace-nowrap")
            const actionsTask = DOMUtility.createElement(task, "div", "", "flex justify-end gap-5 w-1/6")

            const editDiv = DOMUtility.createElement(actionsTask, "div", "")
            editDiv.addEventListener("click", (e) => {
                iconDiv.style.visibility = "hidden";
                taskText.style.visibility = "hidden";
                taskDate.style.visibility = "hidden";
                actionsTask.style.visibility = "hidden";

                const inputDiv = DOMUtility.createElement(task, "form", "", "absolute w-4/6 h-9 bg-transparent", "inputDiv");
                const inputText = DOMUtility.createElement(inputDiv, "input", "", "w-4/6 rounded-md bg-gray-600 pl-2", "inputText");
                inputText.value = data["tasks"][element]["text"]

                const inputDate = DOMUtility.createElement(inputDiv, "input", "", "w-1/6 rounded-md bg-gray-600", "inputText");
                inputDate.value = data["tasks"][element]["date"]
                inputDate.setAttribute("type", "date")
                const inputBtn = DOMUtility.createElement(inputDiv, "buttton", "save", "ml-1 px-1 m-auto rounded-md bg-gray-500 hover:cursor-pointer", "inputBtn");
                inputBtn.setAttribute("type", "submit")
                console.log(inputDiv)
                inputBtn.addEventListener("click", (e) => {
                    data["tasks"][element]["text"] = inputText.value;
                    data["tasks"][element]["date"] = moment(inputDate.value).format("YYYY-MM-DD");
                    storageBridge.setTask(index, element, data["tasks"][element]);
                    renderPanel(content, storageBridge.getData(), index);

                })
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
                "date": moment().format("YYYY-MM-DD"),
                "status": true
            };
            storageBridge.createTask(index, newTask)
            renderPanel(content, storageBridge.getData(), index)
        })
    }
}
export default renderConternt;