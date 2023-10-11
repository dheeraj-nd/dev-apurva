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

function limitText(text, limit) {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
}
// render all the cards to be shown by default

function renderCards(data) {
  const cardDeckContainer = document.getElementById("card-deck-container");
  cardDeckContainer.innerHTML = "";
  const cardHTMLArray = [];
  let hasCardsToShow = false;

  data.forEach((apurvaStories) => {
    const { category, imagePath, author, readTime, title, URL } = apurvaStories;

    if (category == "BLOGS" || "IMPACT STORIES") {
      const limitedTitle = limitText(title, 55);
      cardHTMLArray.push(`
          <div class="col-lg-4 col-sm-6 mt-5 d-none d-sm-block">
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
          <a href="${URL}" target="#"> 
        <div class="blog d-sm-block d-md-none border-bottom">  
        
              <h6 class="card-title text-left">${author}</h6>
              <div class="blogcontent">
                 <div class="row "> 
                    <div class="col-7">
                     <p class="crad-blogtext">${limitedTitle}</p>
                   </div>
                    <div class="col-5">
                      <img src="${imagePath}" class="card-blogimg" >
                    </div>
                  </div>
               </div>
               <div class ="category">
                 <h6> ${category} </h6>
                 <h5>${readTime}</h5>
                </div>
                
               
          </div>           
        </a>
        
        `);
      hasCardsToShow = true;
    }
  });

  if (!hasCardsToShow) {
    cardHTMLArray.push(`<p class="impact-coming-soon mt-5">COMING SOON...</p>`);
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
        (apurvaStories) => apurvaStories.category === "Blogs"
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

function renderButtons(data, isActive = false) {
  const modelPopupBtn = document.getElementById("carousel-inner-cards");
  // const carouselCardContent = document.getElementById("carousel-card-content");
  modelPopupBtn.innerHTML = "";

  data.forEach((apurvaExplains, index) => {
    const buttonHTML = `
      <div class="carousel-item ${isActive && "opacity-reduced"}  col-md-4">
        <div class="card apurva-explains-card" style="width: 20rem">
          <div class="card-body apurva-explains-card-body">
            <h5 class="card-title apurva-explains-card-title">
              ${apurvaExplains.btnTitle}
            </h5>
          </div>
        </div>
        <div class="mt-5 card-description  ${!isActive && " d-none"}">
           <p>${apurvaExplains.apurvaExplainsContent}</p>
        </div>
      </div>
    `;

    modelPopupBtn.insertAdjacentHTML("beforeend", buttonHTML);
  });

  $("#theCarousel").carousel({
    interval: false, // Disable automatic sliding
  });

  $("#theCarousel").on("slid.bs.carousel", function (event) {
    const activeIndex = $(".carousel-item.active").index();
    const direction = event.direction;
    // Check if there is any carousel item with 'opacity-reduced' class

    const reducedItem = $(".carousel-item.opacity-reduced");

    if (direction === "left") {
      $(".carousel-item").eq(activeIndex).removeClass("opacity-reduced");
      $(".carousel-item")
        .eq(activeIndex + 1)
        .addClass("opacity-reduced");

      $(".carousel-item")
        .eq(activeIndex + 1)
        .find(".card-description")
        .removeClass("d-none");
      $(".carousel-item")
        .eq(activeIndex)
        .find(".card-description")
        .addClass("d-none");
    } else if (direction === "right") {
      $(".carousel-item")
        .eq(activeIndex + 2)
        .removeClass("opacity-reduced");
      $(".carousel-item")
        .eq(activeIndex + 1)
        .addClass("opacity-reduced");

      $(".carousel-item")
        .eq(activeIndex + 1)
        .find(".card-description")
        .removeClass("d-none");

      $(".carousel-item")
        .eq(activeIndex + 2)
        .find(".card-description")
        .addClass("d-none");
    }
  });

  $(".carousel-item")
    .eq(0)
    .addClass("active")
    .next()
    .addClass("opacity-reduced");

  $(".carousel-item")
    .eq(0)
    .next()
    .find(".card-description")
    .removeClass("d-none");
}

$(".multi-item-carousel").on("slide.bs.carousel", function (e) {
  let $e = $(e.relatedTarget),
    itemsPerSlide = 3,
    totalItems = $(".carousel-item", this).length,
    $itemsContainer = $(".carousel-inner", this),
    it = itemsPerSlide - (totalItems - $e.index());

  if (it > 0) {
    for (var i = 0; i < it; i++) {
      $(".carousel-item", this)
        .eq(e.direction == "left" ? i : 0)
        // append slides to the end/beginning
        .appendTo($itemsContainer);
    }
  }
});

const initialFetch = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      renderButtons(jsonData.apurvaExplains);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

initialFetch();

// Search Functionality

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("carousel-inner-cards");

function search() {
  const searchText = searchInput.value.toLowerCase();

  const searchWords = searchText
    .split(" ")
    .filter((word) => word.trim() !== "");
  searchResults.innerHTML = "";

  if (!searchText.trim().length) {
    initialFetch();
  } else {
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
            renderButtons(filteredData, true);
          } else {
            searchResults.innerHTML = `
          <p class="search-not-found">No search results found.</p>
          `;
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

searchInput.addEventListener("input", search);
