//SET-UP

const form = document.getElementById('postform');
const postList = document.querySelector('ul');
const singlePost = document.getElementById('singlePost');
const postsHeaderTitle = document.getElementById('postsHeaderTitle');

//Bind event listeners
form.addEventListener('submit', submitPost);

// btn.addEventListener('submit', submitPost)

getAllPosts();
//index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
}

// create
function submitPost(e){
    // e.preventDefault();

    const postData = {
        title: e.target.title.value,
        author: e.target.author.value,
        story: e.target.story.value
    };

    console.log(postData)

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(r => console.log(r))

        .then(appendPost)
        .catch(console.warn)
};

function removeForm(){
    console.log("removed")
    form.style.display = "none";
    postList.style.display = "none";
    postsHeaderTitle.style.display = "none";


}

function showPost(id){
    removeForm();

    console.log(id)
    fetch(`http://localhost:3000/posts/${id}`)
        .then(r => r.json())
        // .then(r => console.log(r.post[0].title))
        // .then(appendData)
        .then(data => {
            const {post} = data
            appendData(post)
        });
    

} 

function appendData(data){
    console.log(data[0].author)
    const title = document.createElement('h1');
    const author = document.createElement('h3');
    const story = document.createElement('h2');
    title.textContent = data[0].title;
    author.textContent = data[0].author;
    story.textContent = data[0].story;
    singlePost.append(title);
    singlePost.append(author);
    singlePost.append(story);
    
}   


// helpers
function appendPosts(data){
    console.log(data)
    data.posts.forEach(appendPost);
};

function appendPost(postData){
    console.log(postData.id)
    const newLi = document.createElement('li');
    const newa = document.createElement('a')
    // newa.setAttribute("href", './singlePost.html')
    newa.textContent = postData.title;
    newLi.append(newa);
    postList.append(newLi);
    newa.onclick = () => showPost(postData.id);
};
