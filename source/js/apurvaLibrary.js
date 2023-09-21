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

jQuery(function ($) {
  "use strict";

  let $window = $(window);
  let windowsize = $(window).width();

  /* ====================================
           Nav Fixed On Scroll
           ======================================= */

  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= 80) {
      // Set position from top to add class

      $("header").addClass("header-appear");
    } else {
      $("header").removeClass("header-appear");
    }
  });

  if ($("nav.navbar").hasClass("bottom-nav")) {
    let navHeight = $(".bottom-nav").offset().top;
    $(window).on("scroll", function () {
      if ($window.scrollTop() > navHeight) {
        $("header").addClass("header-appear");
      } else {
        $("header").removeClass("header-appear");
      }
    });
  }

  /* ===================================
         Side Menu
         ====================================== */

  if ($(".sidemenu_toggle").length) {
    $(".sidemenu_toggle").on("click", function () {
      $(".pushwrap").toggleClass("active");
      $(".side-menu").addClass("side-menu-active"),
        $("#close_side_menu").fadeIn(700);
    }),
      $("#close_side_menu").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
          $(this).fadeOut(200),
          $(".pushwrap").removeClass("active");
      }),
      $(".side-nav .navbar-nav .nav-link").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
          $("#close_side_menu").fadeOut(200),
          $(".pushwrap").removeClass("active");
      }),
      $("#btn_sideNavClose").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
          $("#close_side_menu").fadeOut(200),
          $(".pushwrap").removeClass("active");
      });
  }
});

// render all the cards to be shown by default

function renderCards(data) {
  const cardDeckContainer = document.getElementById("card-deck-container");
  cardDeckContainer.innerHTML = "";
  const cardHTMLArray = [];
  let hasCardsToShow = false;

  data.forEach((apurvaStories) => {
    const { category, imagePath, author, readTime, title, URL } = apurvaStories;

    if (category == "BLOGS" || "IMPACT STORIES") {
      cardHTMLArray.push(`
          <div class="col-lg-4 col-sm-6 mt-5">
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
        `);
      hasCardsToShow = true;
    }
  });

  if (!hasCardsToShow) {
    cardHTMLArray.push(
      `<p class="impact-coming-soon mt-5 ml-5">COMING SOON...</p>`
    );
  }

  cardDeckContainer.innerHTML = cardHTMLArray.join("");
}

fetch("data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    renderCards(jsonData.apurvaStories);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Add click event listeners for the buttons

const showAllButton = document.getElementById("all-btn");
const showBlogsButton = document.getElementById("blogs-btn");
const showImpactStoriesButton = document.getElementById("impact-stories-btn");

function removeActiveClass() {
  showAllButton.classList.remove("active");
  showBlogsButton.classList.remove("active");
  showImpactStoriesButton.classList.remove("active");
}

// all button functionality

showAllButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      renderCards(jsonData.apurvaStories);
      removeActiveClass();
      showAllButton.classList.add("active");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// blogs button functionality

showBlogsButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const blogCategoryData = jsonData.apurvaStories.filter(
        (apurvaStories) => apurvaStories.category === "BLOGS"
      );
      renderCards(blogCategoryData);
      removeActiveClass();
      showBlogsButton.classList.add("active");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// impact button functionality

showImpactStoriesButton.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      const blogCategoryData = jsonData.apurvaStories.filter(
        (apurvaStories) => apurvaStories.category === "IMPACT STORIES"
      );
      renderCards(blogCategoryData);
      removeActiveClass();
      showImpactStoriesButton.classList.add("active");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// apurva explains button render functionality

function renderButtons(data) {
  const modelPopupBtn = document.getElementById("modal-btn-div");
  modelPopupBtn.innerHTML = "";

  data.forEach((apurvaExplains, index) => {
    const buttonHTML = `
      <div class="${apurvaExplains.btnclass} mt-4">
        <button
          type="button"
          class="btn modal-btn"
          data-toggle="modal"
          data-target="#exampleModal-${index}">
        
          ${apurvaExplains.btnTitle}
        </button>
      </div>
      <div  class="modal fade" id="exampleModal-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
  const searchWords = searchText
    .split(" ")
    .filter((word) => word.trim() !== "");
  searchResults.innerHTML = "";

  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      if (Array.isArray(jsonData.apurvaExplains)) {
        const filteredData = jsonData.apurvaExplains.filter((item) => {
          return searchWords.every((word) =>
            item.btnTitle.toLowerCase().includes(word)
          );
        });
        if (filteredData.length > 0) {
          renderButtons(filteredData);
        } else {
          searchResults.innerHTML = `
          <p class="search-not-found ml-5">No search results found.</p>
          `;
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

searchInput.addEventListener("input", search);
