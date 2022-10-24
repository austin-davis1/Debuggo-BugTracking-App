import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { editTask } from "../../api/api";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../reduxActions";

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

    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.description)
    const [error, setError] = useState(false)

    let dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            alert("Title and description cannot be blank")
            setError(false)
        }
    }, [error])



    function submitEdit() {
        if (title === "" || desc === "") {
            setError(true)
        } else {
            let object = {}
            object.title = title
            object.description = desc
            editTask(data._id, object)
            dispatch(setRefresh(true))
            setEdit(false)
        }
    }

    return (
        <>
            <Link to="/dashboard">
                <button className="bg-white mt-5 w-32 h-12 hover:border-4 rounded-lg hover:border-black hover:bg-blue hover:text-white">Back</button>
            </Link>
            <div className = "flex flex-col border-solid border-black border-2 mt-10 rounded-lg">\
                {!edit
                ?
                <>
                    <h1 className="text-3xl p-7">{title}</h1>
                    <h2 className="text-2xl p-7">{desc}</h2>
                    <button className="text-2xl p-7 mb-5 hover:border-2 hover:border-black" onClick={() => setEdit(true)}>Edit Task</button>
                </>
                :
                <>
                    <input className="text-3xl p-7 " onChange={(e) => setTitle(e.target.value)} placeholder={data.title}/>
                    <input className="text-2xl p-7" onChange={(e) => setDesc(e.target.value)} placeholder={data.description}/>
                    <button className="text-2xl p-7 mb-5 hover:border-2 hover:border-black" onClick={() => submitEdit()}>Submit Edit</button>
                    <button className="text-2xl p-7 mb-5 hover:border-2 hover:border-black" onClick={() => setEdit(false)}>Cancel</button>
                </>}
            </div>
        </>
    )
}
