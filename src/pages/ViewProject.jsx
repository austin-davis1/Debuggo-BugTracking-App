import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export function ViewProject() {
    let projectId = useParams()
    let allProjects = useSelector(state => state.projects)

    let data

    for (const project of allProjects) {
        if (project._id == projectId) {
            data = project
            break
        }
    }

    return (
        <></>
    )
}