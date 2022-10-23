import { Link } from "react-router-dom"

export function Landing() {
    return(
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex-row">
                    <h1>Landing page</h1>
                    <Link to="/dashboard">Click this mf link boi</Link>
                </div>
            </div>
        </>
    )
}