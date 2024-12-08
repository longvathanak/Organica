'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
}



/**
 * search toggle
 */

const searchContainer = document.querySelector("[data-search-wrapper]");
const searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click", function () {
    searchContainer.classList.toggle("active");
});



/**
 * whishlist & cart toggle
 */

const panelBtns = document.querySelectorAll("[data-panel-btn]");
const sidePanels = document.querySelectorAll("[data-side-panel]");

for (let i = 0; i < panelBtns.length; i++) {
  panelBtns[i].addEventListener("click", function () {

    let clickedElemDataValue = this.dataset.panelBtn;

    for (let i = 0; i < sidePanels.length; i++) {

      if (clickedElemDataValue === sidePanels[i].dataset.sidePanel) {
        sidePanels[i].classList.toggle("active");
      } else {
        sidePanels[i].classList.remove("active");
      }

    }

  });
}



/**
 * back to top
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  window.scrollY >= 100 ? backTopBtn.classList.add("active")
    : backTopBtn.classList.remove("active");
});



/**
 * product details page
 */

const productDisplay = document.querySelector("[data-product-display]");
const productThumbnails = document.querySelectorAll("[data-product-thumbnail]");

for (let i = 0; i < productThumbnails.length; i++) {
  productThumbnails[i].addEventListener("click", function () {
    productDisplay.src = this.src;
    productDisplay.classList.add("fade-anim");

    setTimeout(function () {
      productDisplay.classList.remove("fade-anim");
    }, 250);

  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsBox = document.getElementById("autocompleteResults");

  // List of products
  const products = [
    "Fresh Orangey",
    "Key Lime",
    "Fresh Watermelon",
    "Fresh Strawberry",
    "Pomegranate Fruit",
    "Red Onion",
    "Len Results Brocoli",
    "Len Results Spinach",
    "Lorigun Artifical",
    "Leaf Lectuce"
  ];

  // Function to filter products based on user input
  const filterProducts = (query) => {
    if (!query) return []; // If the query is empty, return an empty array
    return products.filter(product => 
      product.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Function to display filtered suggestions
  const displaySuggestions = (suggestions) => {
    resultsBox.innerHTML = ""; // Clear previous results

    if (suggestions.length === 0) {
      resultsBox.innerHTML = "<li>No matches found</li>";
      return;
    }

    suggestions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => {
        searchInput.value = item; // Set input to the selected suggestion
        resultsBox.innerHTML = ""; // Clear suggestions
      });
      resultsBox.appendChild(li);
    });
  };

  // Event listener for input changes
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    const filteredResults = filterProducts(query);
    displaySuggestions(filteredResults);
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".input-wrapper")) {
      resultsBox.innerHTML = "";
    }
  });
});
