import { ProfilePicture } from "./profilePic"

export function ProfilePictureSection({images}) {
    return (
        <>
            <div className="flex flex-row mx--2 w-full">
                {images.map(image => {
                    return (
                        <ProfilePicture image={image}/>
                    )
                })}

            </div>
        </>
    )
}