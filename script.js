const apiFile = "https://jsonplaceholder.typicode.com/posts";

fetch(apiFile)
  .then(resp => resp.json())
  .then(posts => {
    const app = document.getElementById("app");

    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      card.append(title, body);
      app.appendChild(card);
    });
  })
  .catch(err => console.log("Error:", err));