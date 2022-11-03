import { useState, useEffect } from "react"
import { createTask } from "../../api/api"
import { useDispatch } from "react-redux"
import { setRefresh } from "../../reduxActions"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function NewIssue() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState(false)
    const [tags, setTags] = useState([])

    const allTags = [
        "Urgent",
        "Priority",
        "Bug",
        "Upgrade",
        "Question",
        "Help Needed"
    ]

    console.log(tags)

    let dispatch = useDispatch()
    const navigate = useNavigate()

    let { projectId } = useParams()

    useEffect(() => {
        if (error) {
            alert("Title and description cannot be blank")
            setError(false)
        }
    }, [error])

    function handleClick(tag) {
        if (tags.find(ptag => ptag == tag)) {
            setTags(current => current.filter(ptag => {return ptag !== tag}))
        }
        else {
            setTags([...tags,tag])
        }
    }

    async function submitForm() {
        if (title === "" || desc === "") {
            setError(true)
        } else {
            let object = {}
            object.title = title
            object.description = desc
            object.projectId = projectId
            object.dateCreated = new Date()
            object.tags = tags
            createTask(object)
            dispatch(setRefresh(true))
            navigate(`/projects/view_project/${projectId}`)
        }
    }

    function handleClick(tag) {
        setTags([...tags, tag])
        //setTags(tags.push(tag))
        console.log(tags)
    }

    return (
        <>
            <Link to={`/projects/view_project/${projectId}`}>
                    <button className="bg-white mt-5 w-32 h-12 hover:border-4 rounded-lg hover:border-black hover:bg-blue hover:text-white">Back</button>
            </Link>
            <div className = "flex flex-col p-5 text-white mb-5 h-auto rounded-lg bg-black">
                <input onChange = {e => setTitle(e.target.value)} placeholder="Title goes here" className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></input>
                <textarea onChange = {e => setDesc(e.target.value)} placeholder="Description goes here" className = "flex-grow text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></textarea>
                <button onClick={() => submitForm()}>Submit Form</button>
            </div>
            <div classname="flex grid grid-cols-2 gap-2">
                {allTags.map(tag => {
                    return (<button onClick={() => handleClick(tag) } className={"w-24 h-12 hover:bg-white " + (tags.find((ptag) => ptag == tag) ? "bg-blue" : " ")}>{tag}</button>)
                })}
            </div>
        </>
    )
}