jQuery(window).on("load", function () {
  "use strict";

  /*  ===================================
       Loading Timeout
       ====================================== */
  $("#loader-fade").fadeOut(800);
});

$(document).ready(function () {
  // Retrieve the active menu item from session storage if available
  let activeMenuItem = sessionStorage.getItem("activeMenuItem");
  if (activeMenuItem) {
    $(".nav-link").removeClass("active");
    $('a[href="' + activeMenuItem + '"]').addClass("active");
  } else {
    $(".nav-item:first-child .nav-link").addClass("active");
  }

  // Add active class on click and save the active menu item in session storage
  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    sessionStorage.setItem("activeMenuItem", $(this).attr("href"));
  });

  // text animation on scroll starts
  const sections = document.querySelectorAll(".introTitle");

  function animateSections() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const windowBottom = window.innerHeight;
      const windowTop = 0;

      if (sectionTop < windowBottom && sectionBottom > windowTop) {
        section.classList.add("animate-introTitle");
      } else {
        section.classList.remove("animate-introTitle");
      }
    });
  }

  sections.forEach((section) => {
    section.classList.add("animate-introTitle");
  });

  window.addEventListener("scroll", animateSections);
  // text animation ojn scroll ends
});

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

//   /* ===================================
//              Loading Timeout
//       ====================================== */

$("#conversationBtn").on("click", function () {
  $("#message").attr(
    "placeholder",
    'Describe the problem that "Apurva for Co-creation" would address for your organization.'
  );

  $(".type").attr("value", "Co-creation");
});

$("#communitiesBtn").on("click", function () {
  $("#message").attr(
    "placeholder",
    'Describe the problem that "Apurva for Communities" would address for your organization.'
  );

  $(".type").attr("value", "Communities");
});

$("#queryBtn").on("click", function () {
  $("#message").attr(
    "placeholder",
    'Describe the problem that "Apurva for Discovery" would address for your organization.'
  );

  $(".type").attr("value", "Discovery");
});

function sendEmail() {
  let formData = $("#contact-form-data").serializeArray();
  let post_data, output;
  let proceed = "true";
  $("#contact-form-data .input").each(function () {
    if ($(this).attr("name") === "name") {
      if (!$(this).val()) {
        output =
          '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing name fields.</div>';
        proceed = "false";
      }
    } else if ($(this).attr("type") === "email") {
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test($(this).val())) {
        output =
          '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing email fields.</div>';
        proceed = "false";
      }
    } else if ($(this).attr("type") === "website") {
      let urlRegex =
        /^((https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]{2,3})+)$/;
      if (!urlRegex.test($(this).val())) {
        output =
          '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing website fields.</div>';
        proceed = false;
      }
    } else if ($(this).attr("name") === "message") {
      if (!$(this).val()) {
        output =
          '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing message fields.</div>';
        proceed = "false";
      }
    }
  });

  // Convert the form data to a plain object
  const requestData = {};
  formData.forEach(function (item) {
    requestData[item.name] = item.value;
  });

  if (proceed === "true") {
    output = "<div></div>";
    $("#result").hide().html(output);
    $(".contact_btn").css("cursor", "default");
    $(".submit-button-text").prop("hidden", true);
    $(".submit-button-spinner").prop("hidden", false);
    $(".submit-button-spinner").show();
    let pathArray = window.location.pathname.split("/");
    let secondLevelLocation = pathArray[3];

    if ($("#result").length) {
      // alert("yes");
      $("#result").hide().html(output).slideDown();
      $(".contact_btn i").addClass("d-block");
    } else {
      if (response.type == "error") {
        Swal.fire({
          type: "error",
          icon: "error",
          title: "Oops...",
          html: '<div class="text-danger">' + response.msg + "</div>",
        });
        $(".contact_btn i").addClass("d-block");
      } else {
        Swal.fire({
          type: "success",
          icon: "success",
          title: "Success!",
          html: '<div class="text-success">' + response.msg + "</div>",
        });
        $(".contact_btn i").addClass("d-block");
      }
    }
    //data to be sent to server
    $.ajax({
      // url: "https://apurva-early-access-register-hawt6l52da-el.a.run.app",
      url: "https://apurva-early-access-register-hawt6l52da-el.a.run.app/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(requestData),

      success: function (response) {
        $(".contact_btn").css("cursor", "pointer");
        $(".submit-button-text").prop("hidden", false);
        $(".submit-button-spinner").prop("hidden", true);
        $(".submit-button-spinner").hide();
        if (response.type == "error") {
          output =
            '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' +
            response.msg +
            "</div>";
        } else {
          output =
            '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' +
            response.msg +
            "</div>";
          //reset values in all input fields
          $(".contact-form input").val("");
          $(".contact-form textarea").val("");
        }

        if ($("#result").length) {
          // alert("yes");
          $("#result").hide().html(output).slideDown();
          $(".contact_btn i").removeClass("d-block");
        } else {
          if (response.type == "error") {
            Swal.fire({
              type: "error",
              icon: "error",
              title: "Oops...",
              html: '<div class="text-danger">' + response.msg + "</div>",
            });
            $(".contact_btn i").removeClass("d-block");
          } else {
            Swal.fire({
              type: "success",
              icon: "success",
              title: "Success!",
              html: '<div class="text-success">' + response.msg + "</div>",
            });
            $(".contact_btn i").removeClass("d-block");
          }
        }
      },
      error: function () {
        $(".contact_btn").css("cursor", "pointer");
        // $('.submit-button-text').prop('hidden', false);
        // $('.submit-button-spinner').prop('hidden', true);
        // $('.submit-button-spinner').hide();
        // alert("Failer");
      },
    });
  } else {
    if ($("#result").length) {
      // alert("yes");
      /* output =
              '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>'; */
      $("#result").hide().html(output).slideDown();
      $(".contact_btn i").addClass("d-none");
    } else {
      Swal.fire({
        icon: "error",
        type: "error",
        title: "Oops...",
        html: '<div class="text-danger">Please provide the missing fields.111</div>',
      });
      $(".contact_btn i").addClass("d-none");
    }
  }
}

function subScribe() {
  let formData = $("#subscribe-input").val();
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let output;

  if (!emailPattern.test(formData)) {
    proceed = "false";

    const emptyDiv =
      '<div style="color: red";>Please enter valid email address</div>';
    $("#subscribe-result").html(emptyDiv);
  } else {
    $("#subscribe-result").html("<div></div>");
    $(".subscribe-button").css("cursor", "default");
    // $('.subscribe-button').css('background-color', '#d7ffdd');
    $(".subscribe-button-text").prop("hidden", true);
    $(".subscribe-button-spinner").prop("hidden", false);
    $(".subscribe-button-spinner").show();
    $.ajax({
      url: "https://apurva-updates-subscription-hawt6l52da-el.a.run.app/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email: formData }),

      success: function (response) {
        $(".subscribe-button").css("cursor", "pointer");
        // $('.subscribe-button').css('background-color', '#9fffac');
        $(".subscribe-button-text").prop("hidden", false);
        $(".subscribe-button-spinner").prop("hidden", true);
        $(".subscribe-button-spinner").hide();
        if (response.type == "error") {
          output =
            '<div class="alert-danger" style="padding:10px 15px; margin-top: 15px">' +
            response.msg +
            "</div>";
        } else {
          output =
            '<div class="alert-success subscribrMsg" style="padding:10px 15px; margin-top: 15px">' +
            response.msg +
            "</div>";
          //reset values in all input fields
          $("#subscribe-input").val("");
        }
        $("#subscribe-result").html(output);
        setTimeout(function () {
          $("#subscribe-result").fadeOut("fast");
        }, 3000);
      },
      error: function () {
        $(".subscribe-button").css("cursor", "pointer");
        // $('.subscribe-button').css('background-color', '#9fffac');
        $(".subscribe-button-text").prop("hidden", false);
        $(".subscribe-button-spinner").prop("hidden", true);
        $(".subscribe-button-spinner").hide();
        // alert("Failer");
      },
    });
  }
}

$(".contact_btn").on("click", () => {
  // API Endpoint
  // https://apurva-early-access-nmn5wq3nzq-em.a.run.app

  sendEmail();
});
$(".subscribe-button").on("click", () => {
  // API Endpoint
  // https://apurva-subscription-nmn5wq3nzq-em.a.run.app
  subScribe();
});

const carousel = document.querySelector(".carouselfeatured");
let cardIndex = 0;

setInterval(() => {
  cardIndex = (cardIndex + 1) % 5;
  carousel.style.transform = `translateX(-${cardIndex * 320}px)`; // Adjust the value to match your card width + margin
}, 3000); // Adjust the duration for auto-sliding
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("conversationBtn");
const btn1 = document.getElementById("queryBtn");
const btn2 = document.getElementById("communitiesBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

btn1.onclick = function () {
  modal.style.display = "block";
};

btn2.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  const result = document.querySelector("#result");
  const formInput = $("#contact-form-data .input");

  modal.style.display = "none";
  result.style.display = "none";
  formInput.val("");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  const formInput = $("#contact-form-data .input");
  if (event.target == modal) {
    modal.style.display = "none";
    result.style.display = "none";
    formInput.val("");
  }
};
