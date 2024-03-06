/**********************************************************************************
iniisip ko constant yung mga existing establishments sa website, bali if they want 
to add their website need nila tayo icontact ganon, para we don't have to add a
add establishment feature, less gawain, unless need sa specs (???)
**********************************************************************************/
const establishments = [
    {
      name: '24 Chicken',
      rating: '4.9',
      priceRange: ['₱₱', '₱₱'],
      tags: ['Filipino', 'Chicken'],
      description: 'If you\'re on the hunt for a chicken experience that transcends the ordinary, look no further than 24 Chicken.',
      coverImage: '24Chicken.png',
      reviewsButtonClass: 'est-view-review-24chicken viewReviewBtn'
    },
    {
      name: "Ate Rica's Bacsilog",
      rating: '4.9',
      priceRange: ['₱', '₱₱₱'],
      tags: ['Filipino', 'Rice Meal'],
      description: 'Ate Rica\'s Bacsilog lives up to its "Sauce Sarap" promise! Delicious, affordable Filipino comfort food with generous portions and...',
      coverImage: 'AteRicasBacsilog.png',
      reviewsButtonClass: 'est-view-review-ateRicas viewReviewBtn'
    },
    {
      name: 'Tomo Coffee',
      rating: '4.7',
      priceRange: ['₱₱', '₱₱'],
      tags: ['Drinks'],
      description: 'Tucked away in a vibrant student district, Tomo Coffee is a haven for caffeine-craving scholars. I love it so much!',
      coverImage: 'TomoCoffee.png',
      reviewsButtonClass: 'est-view-review-tomo viewReviewBtn'
    },
    {
      name: 'Tinuhog ni Benny',
      rating: '5.0',
      priceRange: ['₱', '₱₱₱'],
      tags: ['Filipino', 'Rice Meal'],
      description: 'Tinuhog ni Benny is a haven for budget-friendly, delicious Filipino comfort food. The highlight is undoubtedly their namesake "tinuhog"...',
      coverImage: 'TinuhogNiBenny.png',
      reviewsButtonClass: 'est-view-review-tinuhog viewReviewBtn'
    },
    {
      name: 'Hungry Seoul',
      rating: '4.9',
      priceRange: ['₱₱', '₱₱'],
      tags: ['Korean', 'Rice Meal'],
      description: 'If you\'re craving a taste of Korea in Manila, Hungry Seoul is definitely worth a visit. This casual restaurant...',
      coverImage: 'HungrySeoul.png',
      reviewsButtonClass: 'est-view-review-hungry-seoul viewReviewBtn'
    },
  ];

  const Review = function(username, rating, date, content, establishment) {
            this.username = username;

            /* TODO: LOGIC FOR USERNAME */
            this.userStatus = "De La Salle University";

            this.rating = rating;
            this.date = date;
            this.content = content;
            this.establishment = establishment;
  }

const reviews = [];

function changeText(option) {
    var selectedText = option.textContent;
    var titleElement = document.querySelector('.category-dropdown-title');
    titleElement.textContent = selectedText;
}

document.addEventListener('DOMContentLoaded', function() {

     /********************** GENERATE ESTABLISHMENTS **********************/ 
    renderEstablishments();
    
    function generateEstablishmentHTML(establishment) {
        return `
          <div class="est-content">
            <img src="../assets/est/content-cover/${establishment.coverImage}" class="est-cover">
            <div class="est-title-container">
              <div class="est-title">${establishment.name}</div>
              <div class="est-rating-container">
                <span class="est-rating">${establishment.rating}</span>
                <img src="../assets/est/content-icons/rating-icon.png" alt="Rating Icon" class="est-rating-icon">
              </div>
            </div>
            <div class="est-subtitle-container">
              <div class="est-price bold">${establishment.priceRange[0]}</div>
              <div class="est-price">${establishment.priceRange[1]}</div>
              &nbsp; • &nbsp;
              ${establishment.tags.map(tag => `<span class="food-tag">${tag}</span>`).join('')}
            </div>
            <div class="est-description-container">
              <img src="../assets/est/content-icons/review-icon.png" alt="Review Icon" class="est-review-icon">
              <div class="est-description">${establishment.description}</div>
            </div>
            <div class="est-review-section">
              <div class="est-add-review addReviewBtn">Add Review</div>
              <div class="${establishment.reviewsButtonClass}">View Review</div>
            </div>
          </div>
        `;
      }

    function renderEstablishments() {
        const estContainer = document.querySelector('.est-container');
        establishments.forEach(establishment => {
            const estHTML = generateEstablishmentHTML(establishment);
            estContainer.innerHTML += estHTML;
        });
    }

    /********************** ADD REVIEW **********************/ 
    renderReviews();
    
    document.querySelector('.submit-button').addEventListener('click', function () {

        /* TODO: LOGIC FOR USERNAME */
        const username = "User"; 
        const rating = document.querySelector('input[name="rating"]:checked').value;
        
        /* format the date to "month day, year" */ 
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleDateString('en-US', options); 
        
        const content = document.getElementById('comment').value;
        const establishment = "24 Chicken"; 
    
        const newReview = new Review(username, rating, date, content, establishment);
        reviews.push(newReview);
        console.log("array length: " + reviews.length);
        renderReviews();
    
        document.getElementById('comment').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('reviewWindow').style.display = 'none';
        console.log("IM HERE");
    });

    function generateReviewHTML(review) {
        console.log("(inside generate review html function)");
        return `
          <div class="view-review">
            <div class="user-info">
              <a href="../../view-profile-section/view-user-${review.username.toLowerCase()}.html">
                <img src="../assets/est/user-profile/shane-cloma.jfif" class="user-icon">
              </a>
              <div class="user-text">
                <span class="username">${review.username}</span>
                <span class="user-status">${review.userStatus}</span>
              </div>
      
              <div class="upvote-container">
                <img src="../assets/est/content-icons/thumbs-up.png" class="upvote">
                <span> (temp) </span>
              </div>
      
              <div class="user-info-sub">
                <div class="user-rating">
                  <span class="rating-user"> ${review.rating + ".0"} </span>
                  <img src="../assets/est/content-icons/rating-icon.png" alt="rating" class="star-rating1">
                </div>
                <span class="dot1"> • </span>
                <span class="date"> ${review.date} </span>
              </div>
            </div>
      
            <div class="post-review-content">
              ${review.content}
            </div>
          </div>
        `;
      }

    function renderReviews() {
        const container = document.querySelector(".view-review-placeholder");
        container.innerHTML = '';
      
        reviews.forEach(review => {
          const reviewHTML = generateReviewHTML(review);
          container.innerHTML += reviewHTML;
        });
    }
    

     /********************** PRICE SELECTION **********************/ 
    const priceButtons = document.querySelectorAll('.price-button-inner, .price-button-outer-left, .price-button-outer-right');

    priceButtons.forEach(button => {
        button.addEventListener('click', togglePriceButtonClick);
    });
    
    function togglePriceButtonClick(event) {
        event.target.classList.toggle('price-button-clicked');
        event.target.classList.toggle('price-button-outer-right.price-button-clicked');
        event.target.classList.toggle('price-button-outer-left.price-button-clicked');
    
    }    

    /********************** ADD TAGS **********************/ 
    const input = document.querySelector('#tag-input');
    const tagForm = document.querySelector('#tagForm');
    const output = document.querySelector('.tags');
    const max = document.querySelector('.max');
    
    function outputTag(tagValue) {
        const tag = `
            <span class="tag">
                <span class="material-icons-outlined remove-button">
                    x
                </span>
                <b>${tagValue}</b>
            </span>
        `;
    
        output.innerHTML += tag;
    }
    
    tagForm.addEventListener('submit', e => {
        e.preventDefault(); 
    
        if (input.value === "") {
            return; 
        }

        if (output.children.length >= 4) {
            input.disabled = true;
            input.placeholder = "Max tags reached!";
            return;
        }
    
        const tagValue = input.value.trim();
        outputTag(tagValue); 
        input.value = "";
        
    });
    
    input.addEventListener('input', e => {
        const sanitizedValue = input.value.replace(/[^\w]/g, ""); 
        input.value = sanitizedValue;
    });
    
    window.addEventListener('click', e => {
        if (e.target.classList.contains('remove-button')) {
            e.target.parentElement.remove();
            input.disabled = false;
            input.placeholder = "Add a tag...";
        }
    });

    /********************** ADD REVIEWS **********************/ 
    
    document.querySelectorAll('.est-add-review').forEach(function(button) {
        button.addEventListener('click', function () {
            document.getElementById('reviewWindow').style.display = 'flex';
        });
    });
    
    document.querySelector('.review-window-container .close-button').addEventListener('click', function () {
        document.getElementById('reviewWindow').style.display = 'none';
    });

    /********************** VIEW REVIEWS **********************/ 
    
    /* 24 Chicken */
    document.querySelectorAll('.est-view-review-24chicken').forEach(function(button) {
        button.addEventListener('click', function () {
            document.getElementById('view-reviewWindow-24chicken').style.display = 'flex';
        });
    });
    
    document.querySelector('.view-window-container-24chicken .close-button').addEventListener('click', function () {
        document.getElementById('view-reviewWindow-24chicken').style.display = 'none';
    });
    
    /* Ate Rica's Bacsilog */
    document.querySelectorAll('.est-view-review-ateRicas').forEach(function(button) {
        button.addEventListener('click', function () {
            document.getElementById('view-reviewWindow-ateRicas').style.display = 'flex';
        });
    });
    
    document.querySelector('.view-window-container-ateRicas .close-button').addEventListener('click', function () {
        document.getElementById('view-reviewWindow-ateRicas').style.display = 'none';
    });
    
    /* Tomo Coffee */
    document.querySelectorAll('.est-view-review-tomo').forEach(function(button) {
    
        button.addEventListener('click', function () {
            document.getElementById('view-reviewWindow-tomo').style.display = 'flex';
        });
    });
    
    document.querySelector('.view-window-container-tomo .close-button').addEventListener('click', function () {
        document.getElementById('view-reviewWindow-tomo').style.display = 'none';
    });
    
    /* Tinuhog ni Benny */
    document.querySelectorAll('.est-view-review-tinuhog').forEach(function(button) {
    
        button.addEventListener('click', function () {
            document.getElementById('view-reviewWindow-tinuhog').style.display = 'flex';
        });
    });
    
    document.querySelector('.view-window-container-tinuhog .close-button').addEventListener('click', function () {
        document.getElementById('view-reviewWindow-tinuhog').style.display = 'none';
    });
    
    /* Hungry Seoul */
    document.querySelectorAll('.est-view-review-hungry-seoul').forEach(function(button) {
    
        button.addEventListener('click', function () {
            document.getElementById('view-reviewWindow-hungry-seoul').style.display = 'flex';
        });
    });
    
    document.querySelector('.view-window-container-hungry-seoul .close-button').addEventListener('click', function () {
        document.getElementById('view-reviewWindow-hungry-seoul').style.display = 'none';
    });

  });






