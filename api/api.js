
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

export async function getAllProjects() {
    const response = await fetch(`http://localhost:5000/project/`)

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    //const records = await response.json()
    const projects = await response.json()
    
    return projects
}

export async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/users/`)

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    //const records = await response.json()
    const users = await response.json()
    
    return users
}

export async function sortProjectsTasks(projects, tasks) {
    let projectObject = {}
    for (const project in projects) {
        let id = project._id
        for (const task in tasks) {
            if (id == task.projectId) {
                
            }
        }
    }
}

export async function createTask(object) {
    console.log(object)
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

export async function createProject(object) {
    await fetch("http://localhost:5000/project/add", {
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

export async function deleteProject(_id) {
    console.log("Delete called")
    await fetch(`http://localhost:5000/delete/${_id}`, {
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
    object.status = status

    if (object.status == 0) {
        object.dateCompleted = new Date()
    } else if (object.status == 1) {
        object.dateCompleted = null
        object.completedBy = null
    }
    
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

export async function editProject(_id, object, status) {
    object.status = status
    await fetch(`http://localhost:5000/updateP/${_id}`, {
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

export async function completeProject(_id, object) {
    object.status = 0
    await fetch(`http://localhost:5000/updateP/${_id}`, {
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

    let tasks = await getAllTasks()
    tasks.map((task) => {
        if (task.projectId == _id) {
            console.log("Made it inside important if")
            editTask(task._id, task, 0)
        }
    })
}

export async function createUser(object) {
    console.log(object)
    object.pictureID = null
    let response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })
    let returnResponse = await response.json()
    console.log(returnResponse)

    return returnResponse
}

export async function verifyUser(object) {
    let response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })

    let returnResponse = await response.json()
    console.log(returnResponse)

    return returnResponse
}

export async function getUser(_id) {
    const response = await fetch(`http://localhost:5000/user/` , {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        id: _id
    })

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    //const records = await response.json()
    const user = await response.json()
    

    return user
}