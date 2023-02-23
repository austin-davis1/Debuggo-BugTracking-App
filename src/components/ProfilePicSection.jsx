import { ProfilePicture } from "./profilePic"

export function ProfilePictureSection({images}) {
    console.log("IMAGES INSIDE COMP")
    console.log(images)
    return (
        <>
            <div className="flex flex-row mx--2 w-96 h-16">
                {images.map(image => {
                    return (
                        <div className="flex h-16 w-16">
                            <ProfilePicture image={image}/>
                        </div>
                    )
                })}

            </div>
        </>
    )
}