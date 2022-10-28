import { Link } from "react-router-dom"

export function ProjectCard({project}) {

    let url = `view_project/${project._id}`

    return (
        <Link to = {url} className="flex flex-col bg-white border-solid border-2 border-black rounded-lg p-4 mt-6 mb-6 hover:bg-off-white cursor-pointer">
            <h1 className="text-4xl">{project.name}</h1>
            <h2 className="text-lg">Project Description: {project.description}</h2>
        </Link>
    )
}