import { getAllUsers } from "../../api/api"
import { useEffect, useState } from "react"
import { UserTag } from "../components/userTag"

export function ManageUsers() {

    const [loadingUsers, setLoadingUsers] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function pullUsers() {
            let allUsers = await getAllUsers()
            setLoadingUsers(true)
            setUsers(allUsers)
        }
        pullUsers()
    })

    return (
        <div className="w-6/12">

            {loadingUsers 
            ?
                <>
                    <div className="flex m-2 font-bold flex-row justify-between">
                        <span>Username</span>
                        <span>Name</span>
                        <span>Authorization</span>
                        <span>Email</span>
                    </div>
                    <div>
                        {users.map((user) => {
                            return (
                                <UserTag user={user}/>
                            )
                        })}
                    </div>
                </>
            :
            <>
                <h1>Loading data...</h1>
            </>
            }
        </div>
    )
}