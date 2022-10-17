import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ViewTask() {
    let { taskId } = useParams();
    let allTasks = useSelector(state => state.bugs)
    let data = undefined

    for (const task of allTasks) {
        if (taskId === task._id) {
            data = task
            break
        }
    }

    return (
        <div className = "flex flex-col">
            <h1 className="text-3xl p-7 mb-5">{data.title}</h1>
            <h2 className="text-2xl p-7 mb-5">{data.description}</h2>
            <Link to={`/edit_task/${taskId}`}>Edit Task</Link>
        </div>
    )
}
