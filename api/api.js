

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

/*export default async function deleteTask() {
    console.log("xd")
}

export default async function createTask() {
    console.log("xd")
}

export default async function editTask() {
    console.log("xd")
}*/