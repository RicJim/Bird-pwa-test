
async function loadPosts() {
    const res = await fetch('');
    const data = await res.json();
    console.log(data)    
}

export default function PostsPage(){
    return(
        <h1>Catalago</h1>
    );
}