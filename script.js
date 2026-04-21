//API URL
const apiFile = "https://jsonplaceholder.typicode.com/posts";

const app = document.getElementById("app");

// Fetch data from API
fetch(apiFile)
  .then(resp => resp.json())
  .then(gets => {

    // loop post rendering
    gets.forEach(get => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = get.title;

      const body = document.createElement("p");
      body.textContent = get.body;

      card.append(title, body);
      app.appendChild(card);
    });
  })
  // Error Handler
  .catch(err => console.log("Error:", err));


  
// Create data and send to API
const form = document.getElementById("create");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

form.addEventListener("submit",function(e){
    e.preventDefault();
    alert("Form Submitted");

    // create newPost object
    const newPost = {
      title: titleInput.value,
      body: bodyInput.value
    };
   
    fetch(apiFile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })

    .then(resp => resp.json())
    .then(post => {

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    card.append(title, body);

    // Add new post at top
    app.prepend(card);

    // Clear form
    titleInput.value = "";
    bodyInput.value = "";
  })
   
  .catch(err => console.log("Error:",err));

});







