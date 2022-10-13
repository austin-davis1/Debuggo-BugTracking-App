

export default function NewIssue() {
    return (
        <div className = "flex flex-col p-5 mb-5 h-auto rounded-lg bg-black">
            <input placeholder="Title goes here" className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></input>
            <textarea placeholder="Description goes here" className = "flex-grow text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none"></textarea>
        </div>
    )
}