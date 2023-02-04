import picture from "../SVGs/no-profile-picture-icon.svg"
import { Storage } from "aws-amplify"
import { useState, useEffect } from "react"

export function UserProfile() {

    const [photos, setPhotos] = useState([])

    let user = sessionStorage.getItem("User")
    let userObj = JSON.parse(user)
    let joinDate = new Date(userObj.dateJoined)
    let dateString = joinDate.toISOString().slice(0, 10)

    async function onChange(e) {
        const file = e.target.files[0];
        try {
            await Storage.put(file.name, file, {
            contentType: "image/png", // contentType is optional
            });
            console.log("FILE HAS BEEN UPLOADED!!!")
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    useEffect(() => {
        async function loadPhotos () {
            Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
            .then((result) =>  {
                console.log(result)
                setPhotos(result)
            })
            .catch((err) => console.log(err));
        }
        loadPhotos()
    }, [])




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
            <input type="file" onChange={onChange}/>
            </div>
            <div className="w-full border-solid border-2 mt-6 border-blue">
                
            </div>
        
        </div>
    )
}