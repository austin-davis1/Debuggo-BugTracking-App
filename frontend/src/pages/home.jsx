import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
            <h1>Hello new user</h1>
            <Link to="/view_task">
                <h2>Click this link to view a task </h2>
            </Link>
        </>
    )
}