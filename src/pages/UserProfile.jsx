import picture from "../SVGs/no-profile-picture-icon.svg"

export function UserProfile() {

    let user = sessionStorage.getItem("User")
    let userObj = JSON.parse(user)
    let joinDate = new Date(userObj.dateJoined)
    let dateString = joinDate.toISOString().slice(0, 10)

    return (
        <div className="h-screen">
            <div className="flex h-86 mt-4">
                <div className="h-full static w-64 rounded-full bg-white border-solid border-2 border-blue">
                    <img src={picture} className="flex object-fill rounded-full opacity-70 justify-left"/> 
                </div>
                <div className="ml-48">
                    <h1 className="text-6xl text-blue">{userObj.username}</h1>
                    <h1 className="text-2xl mt-16">{userObj.name}</h1>
                    <h1 className="text-2xl">Contact: {userObj.email}</h1>
                    <h1 className="text-xl">Date Joined: {dateString}</h1>
                </div>
            </div>
            <div className="w-full border-solid border-2 mt-6 border-blue">
                
            </div>
        
        </div>
    )
}