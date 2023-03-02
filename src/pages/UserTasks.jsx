import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Card from "../components/Card"
import { getAllUsers } from "../data/api"
import { useParams } from "react-router-dom"

export function UserTasks() {
    const [tasks, setTasks] = useState([])
    const [projects, setProjects]= useState([])
    let allTasks = useSelector(state => state.bugs)
    let allProjects = useSelector(state => state.projects)

    let { userId } = useParams();
    console.log(userId)
    let username

    const controller = new AbortController()

    useEffect(() => {
        let activeTasks = []
        let activeProjects = []

        function findProjects() {
            for (let project of allProjects) {
                if (activeTasks.find((task) => task.projectId == project._id)) {
                    activeProjects.push(project)
                }
            }
            setProjects(activeProjects)
        }
    
        function findTasks() {
            for (let task of allTasks) {
                if (task.users.find(user => user.username == username)) {
                    activeTasks.push(task)
                }
            } 
            setTasks(activeTasks)
        }

        async function getUsers() {
            let users = await getAllUsers(controller)
            for (let user of users) {
                if (user._id == userId) {
                    username = user.username
                }
            }
            findTasks()
            findProjects()
        }

        getUsers()
    }, [])

    return (
        <>
            <div className="flex flex-col h-full">
                {projects.map((project) => {
                    return (
                    <>
                        <div className="flex bg-white justify-between border-solid border-2 border-black rounded-lg p-2 mt-6 mb-6 h-auto hover:bg-off-white cursor-pointer">
                            <span className="flex flex-col h-full w-full bg-white">
                                <div className="flex w-full bg-blue rounded-lg h-auto">
                                    <h1 className="text-4xl p-2 text-white font-bold">{project.title}</h1>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col w-4/12 bg-white p-2 mt-2 mb-6 mr-16 cursor-pointer">
                                        <h1 className="text-2xl font-bold">Project Description:</h1>
                                        <div className="flex w-full text-black">
                                            <h1 className="text-lg text-black italic">{project.description}</h1>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div className="flex flex-col ml-24">
                            {tasks.filter((task) => task.projectId == project._id).map((task) => {
                                return (
                                    <Card issue={task}/>
                                )

                            })}
                        </div>
                    </>)
                })}
            </div>
        </>
    )
}