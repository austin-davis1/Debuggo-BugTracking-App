import { ProjectCard } from "../components/projectCard"
import { useSelector } from "react-redux"

export function Projects() {

    let projects = useSelector(state => state.projects)

    return (
        <div className="flex flex-col w-full">
            {projects.map(project => <ProjectCard project={project}/>)}
        </div>
    )
}