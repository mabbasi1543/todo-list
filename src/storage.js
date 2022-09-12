let storageJson = `{

  }`


const storageBridge = (() => {
    let storageType = "local";
    let storage = "";
    if (storageType == "json") {
        storage = storageJson
    } else if (storageType == "local") {
        if (localStorage.todo == null || localStorage.todo == undefined) {
            localStorage.todo = storageJson;
            storage = localStorage.todo;
        } else {
            storage = localStorage.todo;
        }
    }
    const saveLocal = () => {
        if (storageType == "local") {
            localStorage.todo = storage
        }
    }

    const getData = () => { return JSON.parse(storage) };

    const setData = (input) => {
        storage = JSON.stringify(input)
        saveLocal()
    };

    const createCategory = (data) => {
        let index = 0;
        let obj = getData();
        while (obj[index] != undefined) {
            index++;
        }
        obj[index] = data;
        setData(obj)
    };

    const getCategory = (index) => {
        return getData()[index];
    };

    const setCategory = (index, data) => {
        let obj = getData();
        obj[index] = data;
        setData(obj)
    };

    const removeCategory = (index) => {
        let obj = getData();
        delete obj[index];
        setData(obj)
    }

    const createTask = (category, data) => {
        let index = 0;
        let obj = getCategory(category);
        while (obj["tasks"][index] != undefined) {
            index++;
        }

        obj["tasks"][index] = data;
        setCategory(category, obj);
    };

    const getTask = (category, index) => {
        let obj = getCategory(category);
        return obj["tasks"][index];
    };

    const setTask = (category, index, data) => {
        let obj = getCategory(category);
        obj["tasks"][index] = data;
        setCategory(category, obj);
    };

    const removeTask = (category, index) => {
        let obj = getCategory(category);
        delete obj["tasks"][index];
        setCategory(category, obj);

    };
    return {
        getData,

        setData,

        createCategory,

        getCategory,

        setCategory,

        removeCategory,

        createTask,

        getTask,

        setTask,

        removeTask,
    }
})();

export default storageBridge;