//API URL
const apiFile = "https://jsonplaceholder.typicode.com/posts";

const app = document.getElementById("app");

// FETCH DATA FROM API
fetch(apiFile)
  .then((resp) => resp.json())
  .then((gets) => {
    // loop post rendering
    gets.forEach((get) => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = get.title;

      const body = document.createElement("p");
      body.textContent = get.body;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "editBtn";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "deleteBtn";

      //create wrapper
      const btnContainer = document.createElement("div");
      btnContainer.className = "btn-group";

      // Edit button(UPDATE)
      editBtn.addEventListener("click", function () {
        modal.style.display = "block";

        editTitle.value = get.title;
        editBody.value = get.body;

        currentPostId = get.id;
        currentCard = card;
      });

      // DELETE THE EXISTING DATA FROM API (DELETE)
      deleteBtn.addEventListener("click", function () {
        alert("Are you sure you want to delete this post?   ")  
        fetch(`${apiFile}/${get.Id}`, {
          method: "DELETE",
        })
          .then(() => {
            card.remove();
          })

          .catch((err) => console.log("Error:", err));
      });

      btnContainer.append(editBtn, deleteBtn);
      card.append(title, body, btnContainer);
      app.appendChild(card);
    });
  })
  // Error Handler
  .catch((err) => console.log("Error:", err));

// CREATE DATA AND SEND TO API
const btn = document.getElementById("create");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

btn.addEventListener("click", function (e) {
  e.preventDefault(); //prevent default reload on webpage
  alert("Form Submitted");

  //Check empty inputz
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title === "" || body === "") {
    return; // stop here (not API call, not create card)
  }

  // create newPost object
  const newPost = {
    title: title,
    body: body,
  };

  // post new data
  fetch(apiFile, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((resp) => resp.json())
    .then((post) => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "editBtn";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "deleteBtn";

      //create wrapper
      const btnContainer = document.createElement("div");
      btnContainer.className = "btn-group";

      btnContainer.append(editBtn, deleteBtn);
      card.append(title, body, btnContainer);

      // Add new post at top
      app.prepend(card);

      // Clear form
      titleInput.value = "";
      bodyInput.value = "";
    })

    // Error Handler
    .catch((err) => console.log("Error:", err));
});

// UPDATE THE EXISTING DATA FROM API
const modal = document.getElementById("modal");
const editTitle = document.getElementById("editTitle");
const editBody = document.getElementById("editBody");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

let currentPostId = null;
let currentCard = null;

// modal remove
// modal.addEventListener("click", function(e){
//     if(e.target === modal);
//   modal.remove()
// }); 

// Update button
saveBtn.addEventListener("click", function () {
  const updatedTitle = editTitle.value.trim();
  const updatedBody = editBody.value.trim();

  if (updatedTitle === "" || updatedBody === "") {
    return;
  }

  // update post
  const updatePost = {
    title: updatedTitle,
    body: updatedBody,
  };

  fetch(`${apiFile}/${currentPostId}`, {
    method: "PATCH", // or PUT

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatePost),
  })
    .then((resp) => resp.json())
    .then((patch) => {
      currentCard.querySelector("h3").textContent = patch.title;
      currentCard.querySelector("p").textContent = patch.body;

      modal.style.display = "none";
    })

    .catch((err) => console.log("Error:", err));
});

//Close Modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
