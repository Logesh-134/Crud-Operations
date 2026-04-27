// API URL
const apiFile = "https://jsonplaceholder.typicode.com/posts";

const app = document.getElementById("app");
const loading = document.getElementById("loader");
const loadBtn = document.getElementById("loadMoreBtn");

// Pagination
let start = 0;
const limit = 10;
const total = 100;

// ================= FETCH POSTS (PAGINATION) =================
function fetchPosts() {
  loading.style.display = "block";
  loadBtn.disabled = true;

  fetch(`${apiFile}?_start=${start}&_limit=${limit}`)
    .then((resp) => resp.json())
    .then((posts) => {
      posts.forEach((post) => createCard(post));

      start += limit;

      // Hide button if all loaded
      if (start >= total) {
        loadBtn.style.display = "none";
      } else {
        loadBtn.disabled = false;
      }

      loading.style.display = "none";
    })
    .catch((err) => console.log("Error:", err));
}

// ================= CREATE CARD FUNCTION =================
function createCard(get) {
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

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-group";

  // EDIT
  editBtn.addEventListener("click", function () {
    modal.style.display = "block";

    editTitle.value = card.dataset.title || get.title;
    editBody.value = card.dataset.body || get.body;

    currentPostId = get.id;
    currentCard = card;
  });

  // DELETE
  deleteBtn.addEventListener("click", function () {
    if (!confirm("Are you sure to delete?")) return;

    fetch(`${apiFile}/${get.id}`, {
      method: "DELETE",
    })
      .then(() => card.remove())
      .catch((err) => console.log("Error:", err));
  });

  btnContainer.append(editBtn, deleteBtn);
  card.append(title, body, btnContainer);
  app.appendChild(card);
}

// ================= INITIAL LOAD =================
fetchPosts();

// Load More button
loadBtn.addEventListener("click", fetchPosts);

// ================= CREATE =================
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    alert("Fill all fields");
    return;
  }

  const newPost = { title, body };

  fetch(apiFile, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((resp) => resp.json())
    .then((post) => {
      createCard(post); // reuse function
      app.prepend(app.lastChild); // move new card to top

      titleInput.value = "";
      bodyInput.value = "";
    })
    .catch((err) => console.log(err));
});

// ================= UPDATE =================
const modal = document.getElementById("modal");
const editTitle = document.getElementById("editTitle");
const editBody = document.getElementById("editBody");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

let currentPostId = null;
let currentCard = null;

// close on outside click
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// SAVE UPDATE
saveBtn.addEventListener("click", function () {
  const updatedTitle = editTitle.value.trim();
  const updatedBody = editBody.value.trim();

  if (!updatedTitle || !updatedBody) return;

  const updatePost = {
    title: updatedTitle,
    body: updatedBody,
  };

  fetch(`${apiFile}/${currentPostId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatePost),
  })
    .then((resp) => resp.json())
    .then((patch) => {
      currentCard.querySelector("h3").textContent = patch.title;
      currentCard.querySelector("p").textContent = patch.body;

      currentCard.dataset.title = patch.title;
      currentCard.dataset.body = patch.body;

      modal.style.display = "none";
    })
    .catch((err) => console.log(err));
});

// CLOSE MODAL
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});