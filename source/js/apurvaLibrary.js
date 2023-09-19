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

  data.forEach((apurvaStories) => {
    const { category, imagePath, author, readTime, title, URL } = apurvaStories;

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
    renderCards(jsonData.apurvaStories);
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
      renderCards(jsonData.apurvaStories);
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
      const blogCategoryData = jsonData.apurvaStories.filter(
        (apurvaStories) => apurvaStories.category === "BLOGS"
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
      const blogCategoryData = jsonData.apurvaStories.filter(
        (apurvaStories) => apurvaStories.category === "IMPACT STORIES"
      );
      renderCards(blogCategoryData);
      removeActiveClass(); // Remove "active" class from both buttons
      showImpactStoriesButton.classList.add("active"); // Add "active" class to the clicked button
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function renderButtons(data) {
  const modelPopupBtn = document.getElementById("modal-btn-div");
  modelPopupBtn.innerHTML = "";

  data.forEach((apurvaExplains, index) => {
    const buttonHTML = `
      <div class="col-md-6 mt-4">
        <button
          type="button"
          class="btn modal-btn"
          data-toggle="modal"
          data-target="#exampleModal-${index}">
        
          ${apurvaExplains.btnTitle}
        </button>
      </div>
      <div  class="modal fade" id="exampleModal-${index}" tabindex="${index}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog"  role="document">
          <div class="modal-content library-modal-content">
              <button type="button"  class="close library-modal-close"  data-dismiss="modal" aria-label="Close">    
                <img src="./source/img/library/x.png" alt="img" />
              </button>
              <img src="${apurvaExplains.imagePath}" alt="img" />
            </div>
        </div>
      </div>
    `;

    modelPopupBtn.insertAdjacentHTML("beforeend", buttonHTML);
  });
}

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    renderButtons(jsonData.apurvaExplains);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Search Functionality

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("modal-btn-div");

function search() {
  const searchText = searchInput.value.toLowerCase();

  // Clear previous search results
  searchResults.innerHTML = "";

  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      if (Array.isArray(jsonData.apurvaExplains)) {
        const filteredData = jsonData.apurvaExplains.filter((item) =>
          item.btnTitle.toLowerCase().includes(searchText)
        );
        if (filteredData.length > 0) {
          // Display the filtered results
          renderButtons(filteredData);
        } else {
          // Show an alert message when no results are found
          searchResults.innerHTML = `
          <p class="ml-5">No search results found.</p>
          `;
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add an event listener to the search input
searchInput.addEventListener("input", search);
