import { Link, UNSAFE_enhanceManualRouteObjects } from "react-router-dom"
import { useState, useEffect } from "react"
import { createUser, verifyUser } from "../../api/api"
import { useNavigate } from "react-router-dom"

export function Landing() {

    const navigate = useNavigate()
    const [create, setCreate] = useState(false)
    const [formError, setFormError] = useState(false)
    const [error, setError] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    //Login state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Creation State
    const [userCreate, setUserCreate] = useState("")
    const [emailCreate, setEmailCreate] = useState("")
    const [passwordCreate, setPasswordCreate] = useState("")

    useEffect(() => {
        if (formError) {
            alert("All fields must be filled out")
            setFormError(false)
        } else if (error) {
            alert("Something went wrong with submission :(")
            setError(false)
        }
    }, [formError, error])

    async function handleLogin() {
        if (email == "" || password == "") {
            setFormError(true)
        } else {
            let userObject ={}
            userObject.email = email
            userObject.password = password
            let response = await verifyUser(userObject)
            if (response.success == true) {
                navigate("/dashboard")
            } else {
                alert("The information was not correct")
            }
        }
    }

    function handleCreation() {
        if (userCreate == "" || emailCreate == "" || passwordCreate == "") {
            setFormError(true)
        } else {
            let userObj = {}
            userObj.username = userCreate
            userObj.email = emailCreate
            userObj.password = passwordCreate
            userObj.dateJoined = new Date()
            userObj.authorizations = ["Admin"]
            if (createUser(userObj)){
                setCreate(false)
            } else{
                setError(true)
            }
        }
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-8xl text-blue">Bug Tracker App</h1>
                <div className="flex flex-col bg-off-white mt-6 w-3/12">
                    {!create ? <>
                    <h1 className="text-6xl m-2">Sign-In</h1>
                    <h1 className="text-2xl m-2">Email:</h1>
                    <input className="m-2" placeholder="Email" onChange = {e => setEmail(e.target.value)}></input>
                    <h1 className="text-2xl m-2">Password:</h1>
                    <input className="m-2 "placeholder="Password" onChange = {e => setPassword(e.target.value)}></input>
                    <div className = "flex flex-row w-full mt-4">
                        <span className = "flex justify-center w-6/12 bg-green text-2xl cursor-pointer" onClick={() => handleLogin()}>Sign In</span>
                        <span className = "flex justify-center w-6/12 bg-blue text-2xl cursor-pointer" onClick={() => setCreate(true)}>Create Account</span>
                    </div>
                    </>
                    :
                    <>
                        <h1 className="text-6xl m-2">Create Account</h1>
                        <h1 className="text-2xl m-2">Username:</h1>
                        <input className="m-2" placeholder="Username" onChange = {e => setUserCreate(e.target.value)}></input>
                        <h1 className="text-2xl m-2">Email:</h1>
                        <input className="m-2" placeholder="Email" onChange = {e => setEmailCreate(e.target.value)}></input>
                        <h1 className="text-2xl m-2">Password:</h1>
                        <input className="m-2 "placeholder="Password" onChange = {e => setPasswordCreate(e.target.value)}></input>
                        <div className = "flex flex-row w-full mt-4">
                            <span className = "flex justify-center w-6/12 bg-green text-2xl cursor-pointer" onClick={() => handleCreation()}>Create</span>
                            <span className = "flex justify-center w-6/12 bg-red text-2xl cursor-pointer" onClick={() => setCreate(false)}>Cancel</span>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}