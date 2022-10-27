
export async function getAllTasks() {
    const response = await fetch(`http://localhost:5000/record/`)

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    //const records = await response.json()
    const records = await response.json()
    

    return records
}

export async function createTask(object) {
    await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    }).catch(error => {
        window.alert(error)
        return
    })
}

export async function deleteTask(_id) {
    console.log("Delete called")
    await fetch(`http://localhost:5000/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        id: _id
    }).catch(error => {
        window.alert(error)
        return
    })
}

export async function editTask(_id, object, status) {
    console.log("Edit called")
    object.status = status
    await fetch(`http://localhost:5000/update/${_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        id: _id,
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })
}

/*export async function archiveTask(_id, object) {
    object.status = 0
    await fetch(`http://localhost:5000/update/${_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        id: _id,
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })
}*/

export async function getTaskCount() {
    
}