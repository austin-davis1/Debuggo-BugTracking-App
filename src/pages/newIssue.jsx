import { useState, useEffect } from "react"
import { createTask } from "../../api/api"
import { useDispatch } from "react-redux"
import { setRefresh } from "../../reduxActions"
import { Link, useNavigate } from "react-router-dom"

export default function NewIssue() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState(false)

    let dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            alert("Title and description cannot be blank")
            setError(false)
        }
    }, [error])

    async function submitForm() {
        if (title === "" || desc === "") {
            setError(true)
        } else {
            let object = {}
            object.title = title
            object.description = desc
            createTask(object)
            dispatch(setRefresh(true))
            navigate('/dashboard')
        }
    }


    return (
        <>
            <Link to="/dashboard">
                    <button className="bg-white mt-5 w-32 h-12 hover:border-4 rounded-lg hover:border-black hover:bg-blue hover:text-white">Back</button>
            </Link>
            <div className = "flex flex-col p-5 text-white mb-5 h-auto rounded-lg bg-black">
                <input onChange = {e => setTitle(e.target.value)} placeholder="Title goes here" className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></input>
                <textarea onChange = {e => setDesc(e.target.value)} placeholder="Description goes here" className = "flex-grow text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></textarea>
                <button onClick={() => submitForm()}>Submit Form</button>
            </div>
        </>
    )
}