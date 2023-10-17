const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})

// Review Section
document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("review-form");
  const reviewsContainer = document.getElementById("reviews");

  // Function to display reviews
  function displayReviews() {
      // Make an API request to get reviews from the server
      fetch("/api/reviews")
          .then(response => response.json())
          .then(reviews => {
              reviewsContainer.innerHTML = "";
              reviews.forEach(function (review) {
                  const reviewElement = document.createElement("div");
                  reviewElement.classList.add("review");
                  reviewElement.innerHTML = `
                      <h2>${review.name} - Rating: ${review.rating}</h2>
                      <p>${review.comment}</p>
                  `;
                  reviewsContainer.appendChild(reviewElement);
              });
          })
          .catch(error => console.error("Error fetching reviews:", error));
  }

  // Display any existing reviews
  displayReviews();

  reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;

      // Create a review object
      const review = { name, rating, comment };

      // Make an API request to add the review to the server
      fetch("/api/reviews/add", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(review)
      })
      .then(response => response.json())
      .then(() => {
          // Refresh reviews after adding a new one
          displayReviews();
      })
      .catch(error => console.error("Error adding review:", error));

      // Clear the form after submission
      reviewForm.reset();
  });
});


// navbar

const homeButton = document.getElementById("home-button");
const menuButton = document.getElementById("menu-button");
const aboutButton = document.getElementById("youtube-button");
const contactButton = document.getElementById("review-button");
const locationButton = document.getElementById("location-button");


homeButton.addEventListener("click", function() {
    window.location.href = "/home.html";
  });

  menuButton.addEventListener("click", function() {
    window.location.href = "";
  });

  