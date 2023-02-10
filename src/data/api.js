export async function getAllTasks() {
    const response = await fetch(`http://localhost:5000/record/`)

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    return await response.json()
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

export async function editTask(id, object, status) {
    object.status = status

    if (object.status == 0) {
        object.dateCompleted = new Date()
    } else if (object.status == 1) {
        object.dateCompleted = null
        object.completedBy = null
    }
    
    await fetch(`http://localhost:5000/update/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        id: id,
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })
}

export async function deleteTask(id) {
    console.log("Delete called")
    await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        id: id
    }).catch(error => {
        window.alert(error)
        return
    })
}

export async function getAllProjects() {
    const response = await fetch(`http://localhost:5000/project/`)

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }

    const projects = await response.json()
    
    return projects
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

export async function editProject(id, object, status) {
    object.status = status
    await fetch(`http://localhost:5000/updateP/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        id: id,
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })
}

export async function completeProject(id, object) {
    object.status = 0
    await fetch(`http://localhost:5000/updateP/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        id: id,
        body: JSON.stringify(object)
    }).catch(error => {
        window.alert(error)
        return
    })

    let tasks = await getAllTasks()
    tasks.map((task) => {
        if (task.projectId == id) {
            console.log("Made it inside important if")
            editTask(task._id, task, 0)
        }
    })
}

export async function deleteProject(id) {
    console.log("Delete called")
    await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        id: id
    }).catch(error => {
        window.alert(error)
        return
    })
}

/*********
 * Users
 *********/
export async function getAllUsers(){
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

export async function getUser(id) {
    const response = await fetch(`http://localhost:5000/users/${id}` , {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        id: id
    })

    if (!response.ok) {
        const message = `An error ocured: ${response.statusText}`
        window.alert(message)
        return
    }
    
    return await response.json()
}

export async function createUser(user){
    user.pictureID = null
    let response = await fetch(`http://localhost:5000/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).catch(error => {
        window.alert(error)
        return
    })

    return await response.json()
}

export async function updateUser(id, user){
    const response = await fetch(`http://localhost:5000/users/${id}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        id: id,
        body:JSON.stringify(user)
    });
}

export async function verifyUser(user) {
    let response = await fetch(`http://localhost:5000/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).catch(error => {
        window.alert(error)
        return
    })

    return await response.json()
}