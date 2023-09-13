jQuery(window).on("load", function () {
  "use strict";

  /*  ===================================
       Loading Timeout
       ====================================== */
  $("#loader-fade").fadeOut(800);
});

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-MPJ848CKT6");

function renderCards(data) {
  const cardDeckContainer = document.getElementById("card-deck-container");
  cardDeckContainer.innerHTML = "";

  data.forEach((blogData) => {
    const { category, imagePath, author, readTime, title, URL } = blogData;

    const cardHTML = `
    <div class="col-md-4 mt-5">
     <a href="${URL}" target="#">
        <div class="card">
        <div class="card-header">
          <span class="badge badge-pill badge-info">${category}</span>
          <img src="${imagePath}" class="card-img-top" alt="img">
        </div>
          <div class="card-body">
            <h5 class="card-title">${author} | ${readTime}</h5>
            <p class="card-text">${title}</p>
          </div>
        </div>
      </a>
    </div>
      `;

    cardDeckContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    renderCards(jsonData.blogCards);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Add click event listeners for the "All" and "Blogs" buttons
const showAllButton = document.getElementById("all-btn");
const showBlogsButton = document.getElementById("blogs-btn");
const showImpactStoriesButton = document.getElementById("impact-stories-btn");

function removeActiveClass() {
  showAllButton.classList.remove("active");
  showBlogsButton.classList.remove("active");
  showImpactStoriesButton.classList.remove("active");
}

showAllButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      renderCards(jsonData.blogCards);
      removeActiveClass(); // Remove "active" class from both buttons
      showAllButton.classList.add("active"); // Add "active" class to the clicked button
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

showBlogsButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // Filter the data to get only blog category items
      const blogCategoryData = jsonData.blogCards.filter(
        (blogData) => blogData.category === "BLOGS"
      );
      renderCards(blogCategoryData);
      removeActiveClass(); // Remove "active" class from both buttons
      showBlogsButton.classList.add("active"); // Add "active" class to the clicked button
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

showImpactStoriesButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // Filter the data to get only blog category items
      const blogCategoryData = jsonData.blogCards.filter(
        (blogData) => blogData.category === "IMPACT STORIES"
      );
      renderCards(blogCategoryData);
      removeActiveClass(); // Remove "active" class from both buttons
      showImpactStoriesButton.classList.add("active"); // Add "active" class to the clicked button
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
