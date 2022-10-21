import { Link } from "react-router-dom"

export default function Card({issue}) {
    let url
    if (issue) {
        JSON.parse(JSON.stringify(issue))
        url = `/view_task/${issue._id}`
    }
    return (
        <>
        {issue 
        ?
        <div className = "transition-all duration-200 w-2/5 h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-blue hover:bg-hover-gray hover:border-purple">
            <Link to={url}>
                <h1 className = "text-3xl truncate font-bold">{issue.title}</h1>
                <h2 className = "text-lg">{issue.description}</h2>
                {issue.status == 1 ? <h3 className = "text-sm">Currently Active</h3> : <h3 className = "text-sm">Currently inactive</h3>}
            </Link>
        </div>
        :
        <div className = "transition-all duration-200 w-2/5 h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-blue hover:bg-hover-gray hover:border-purple">
            <Link to="/new_task">
                <h1 className = "text-3xl text-center font-bold">New Issue</h1>
            </Link>
        </div>}
        </>
    )
}
