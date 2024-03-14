const establishments = [
  {
    name: '24 Chicken',
    rating: '4.9',
    priceRange: ['₱₱', '₱₱'],
    tags: ['Filipino', 'Chicken'],
    description: 'If you\'re on the hunt for a chicken experience that transcends the ordinary, look no further than 24 Chicken.',
    coverImage: '24Chicken.png',
    reviewsButtonClass: 'est-view-review-24chicken view-review-btn',
    addReviewClass: 'add-review-24chicken add-review-btn'
  },
  {
    name: "Ate Rica's Bacsilog",
    rating: '4.9',
    priceRange: ['₱', '₱₱₱'],
    tags: ['Filipino', 'Rice Meal'],
    description: 'Ate Rica\'s Bacsilog lives up to its "Sauce Sarap" promise! Delicious, affordable Filipino comfort food with generous portions and...',
    coverImage: 'AteRicasBacsilog.png',
    reviewsButtonClass: 'est-view-review-ateRicas view-review-btn',
    addReviewClass: 'add-review-ateRicas add-review-btn'
  },
  {
    name: 'Tomo Coffee',
    rating: '4.7',
    priceRange: ['₱₱', '₱₱'],
    tags: ['Drinks'],
    description: 'Tucked away in a vibrant student district, Tomo Coffee is a haven for caffeine-craving scholars. I love it so much!',
    coverImage: 'TomoCoffee.png',
    reviewsButtonClass: 'est-view-review-tomo view-review-btn',
    addReviewClass: 'add-review-tomo add-review-btn'
  },
  {
    name: 'Tinuhog ni Benny',
    rating: '5.0',
    priceRange: ['₱', '₱₱₱'],
    tags: ['Filipino', 'Rice Meal'],
    description: 'Tinuhog ni Benny is a haven for budget-friendly, delicious Filipino comfort food. The highlight is undoubtedly their namesake "tinuhog"...',
    coverImage: 'TinuhogNiBenny.png',
    reviewsButtonClass: 'est-view-review-tinuhog view-review-btn',
    addReviewClass: 'add-review-tinuhog add-review-btn'
  },
  {
    name: 'Hungry Seoul',
    rating: '4.9',
    priceRange: ['₱₱', '₱₱'],
    tags: ['Korean', 'Rice Meal'],
    description: 'If you\'re craving a taste of Korea in Manila, Hungry Seoul is definitely worth a visit. This casual restaurant...',
    coverImage: 'HungrySeoul.png',
    reviewsButtonClass: 'est-view-review-hungry-seoul view-review-btn',
    addReviewClass: 'add-review-hungry-seoul add-review-btn'
  },
];

  const Review = function(username, rating, date, content, establishmentName) {
            this.username = username;

            /* TODO: LOGIC FOR USERNAME */
            this.userStatus = "De La Salle University";
            this.rating = rating;
            this.date = date;
            this.content = content;
            this.establishmentName = establishmentName;
  }

const reviews = [];

function changeText(option) {
    var selectedText = option.textContent;
    var titleElement = document.querySelector('.category-dropdown-title');
    titleElement.textContent = selectedText;
}

document.addEventListener('DOMContentLoaded', function() {

     /*********** GENERATE ESTABLISHMENTS PLUS ITS OWN ADD AND VIEW REVIEW WINDOW ***********/ 
    renderEstablishments();
    
    function generateEstablishmentHTML(establishment) {
      const addReviewWindowId = `reviewWindow-${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
      console.log(addReviewWindowId);

      const viewReviewWindowId = `view-reviewWindow-${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
      console.log(viewReviewWindowId);
  
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
            <div class="${establishment.addReviewClass}">Add Review</div>
            <div class="${establishment.reviewsButtonClass}">View Review</div>
          </div>
        </div>
        
        <!-- Add Review Window -->
        <div id="${addReviewWindowId}" class="review-window-container" style="display: none;">
          <div class="add-review-container"> 
            <img src="../assets/est/content-cover/${establishment.coverImage}" class="main-photo">
            <div class="right-side">
              <div class="close-button">
                <img src="../assets/est/content-icons/close.png" alt="Close" class="close-icon">
              </div>
              <div class="est-title-header">
                <span id="title">${establishment.name}</span>
                <div class="rating-container">
                  <span id="rating">${establishment.rating}</span>
                  <img src="../assets/est/content-icons/rating-icon.png" alt="rating" class="star-rating">
                </div>
              </div>
              <div class="sub-header">
                <div class="price-holder">
                  <span class="price bold">${establishment.priceRange[0]}</span>
                  <span class="price bold-light">${establishment.priceRange[1]}</span>
                  <span id="dot"> • </span>
                </div>
                ${establishment.tags.map(tag => `<div class="tag-container"><span class="tag">${tag}</span></div>`).join('')}
              </div>
              <div class="add-review">
                <span id="select-rating">SELECT YOUR RATING</span>
                <div class="star-rating-container">
                  <input type="radio" id="star5" name="rating" value="1">
                  <label for="star5"></label>
                  <input type="radio" id="star4" name="rating" value="2">
                  <label for="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3">
                  <label for="star3"></label>
                  <input type="radio" id="star2" name="rating" value="4">
                  <label for="star2"></label>
                  <input type="radio" id="star1" name="rating" value="5">
                  <label for="star1"></label>
                </div>
                <div class="review-content">
                  <div class="comment-options">
                    <input type="checkbox" id="bold" />
                    <label for="bold" class="sprite-button" id="bold-button"></label>
                    <input type="checkbox" id="italic" />
                    <label for="italic" class="sprite-button" id="italic-button"></label>
                    <input type="checkbox" id="list" />
                    <label for="list" class="sprite-button" id="list-button"></label>
                  </div>
                  <hr>
                  <textarea id="comment" name="comment" rows="25" cols="50" placeholder="Write a review..."></textarea>
                </div>
                <div class="bottom">
                  <label for="upload" class="custom-upload"> Add a Photo or Video </label>
                  <input type="file" accept="image/*, video/*" id="upload" name="upload" style="display:none;">
                  <button class="submit-button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- View Review Window -->
        <div id="${viewReviewWindowId}" class="view-window-container" style="display: none;">
          <div class="view-review-container"> 
            <img src="../assets/est/content-cover/${establishment.coverImage}" alt="${establishment.name}" class="main-photo">
            <div class="view-right-side">
              <div class="close-button">
                <img src="../assets/est/content-icons/close.png" alt="Close" class="close-icon">
              </div>
              <div class="view-title-header">
                <span id="title">${establishment.name}</span>
                <div class="rating-container">
                  <span id="rating">${establishment.rating}</span>
                  <img src="../assets/est/content-icons/rating-icon.png" alt="rating" class="star-rating">
                </div>
              </div>
              <div class="view-sub-header">
                <div class="price-holder">
                  <span class="price bold">${establishment.priceRange[0]}</span>
                  <span class="price bold-light">${establishment.priceRange[1]}</span>
                  <span id="dot"> • </span>
                </div>
                ${establishment.tags.map(tag => `<div class="tag-container"><span class="tag">${tag}</span></div>`).join('')}
              </div>
              <div class="view-review-placeholder"> </div>
            </div>
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
   
    /********************** ADD & VIEW REVIEW **********************/ 
    let establishmentName = '';

    // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.querySelectorAll('.add-review-btn').forEach(function(button) {
      button.addEventListener('click', function () {
        establishmentName = button.parentElement.querySelector('.est-title').textContent.trim();
        const addReviewWindowId = `reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
        document.getElementById(addReviewWindowId).style.display = 'flex';
      });
    });

    // Event listener for View Review buttons
    document.querySelectorAll('.view-review-btn').forEach(function(button) {
      button.addEventListener('click', function () {
        establishmentName = button.parentElement.querySelector('.est-title').textContent.trim();
        const viewReviewWindowId = `view-reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
        document.getElementById(viewReviewWindowId).style.display = 'flex';
      });
    });

    // Event listener for closing Add Review window
    document.querySelectorAll('.close-add-review').forEach(function(button) {
      button.addEventListener('click', function () {
        establishmentName = button.parentElement.parentElement.id.split('-')[1];
        const addReviewWindowId = `reviewWindow-${establishmentName}`;
        document.getElementById(addReviewWindowId).style.display = 'none';
      });
    });

    // Event listener for closing View Review window
    document.querySelectorAll('.close-view-review').forEach(function(button) {
      button.addEventListener('click', function () {
        establishmentName = button.parentElement.parentElement.id.split('-')[1];
        const viewReviewWindowId = `view-reviewWindow-${establishmentName}`;
        document.getElementById(viewReviewWindowId).style.display = 'none';
      });
    });
    
    document.querySelector('.submit-button').addEventListener('click', function () {
      const username = "User"; 
      const rating = document.querySelector('input[name="rating"]:checked').value;
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date().toLocaleDateString('en-US', options); 
      const content = document.getElementById('comment').value;

      const newReview = new Review(username, rating, date, content, establishmentName);
      reviews.push(newReview);

      renderReviews();

      document.getElementById('comment').value = '';
      document.querySelector('input[name="rating"]:checked').checked = false;
      document.getElementById('reviewWindow').style.display = 'none';
    });

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
    
    // document.querySelectorAll('.est-add-review').forEach(function(button) {
    //     button.addEventListener('click', function () {
    //         document.getElementById('reviewWindow').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.review-window-container .close-button').addEventListener('click', function () {
    //     document.getElementById('reviewWindow').style.display = 'none';
    // });

    /********************** VIEW REVIEWS **********************/ 
    
    /* 24 Chicken */
    // document.querySelectorAll('.est-view-review-24chicken').forEach(function(button) {
    //     button.addEventListener('click', function () {
    //         document.getElementById('view-reviewWindow-24chicken').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.view-window-container-24chicken .close-button').addEventListener('click', function () {
    //     document.getElementById('view-reviewWindow-24chicken').style.display = 'none';
    // });
    
    // /* Ate Rica's Bacsilog */
    // document.querySelectorAll('.est-view-review-ateRicas').forEach(function(button) {
    //     button.addEventListener('click', function () {
    //         document.getElementById('view-reviewWindow-ateRicas').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.view-window-container-ateRicas .close-button').addEventListener('click', function () {
    //     document.getElementById('view-reviewWindow-ateRicas').style.display = 'none';
    // });
    
    // /* Tomo Coffee */
    // document.querySelectorAll('.est-view-review-tomo').forEach(function(button) {
    
    //     button.addEventListener('click', function () {
    //         document.getElementById('view-reviewWindow-tomo').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.view-window-container-tomo .close-button').addEventListener('click', function () {
    //     document.getElementById('view-reviewWindow-tomo').style.display = 'none';
    // });
    
    // /* Tinuhog ni Benny */
    // document.querySelectorAll('.est-view-review-tinuhog').forEach(function(button) {
    
    //     button.addEventListener('click', function () {
    //         document.getElementById('view-reviewWindow-tinuhog').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.view-window-container-tinuhog .close-button').addEventListener('click', function () {
    //     document.getElementById('view-reviewWindow-tinuhog').style.display = 'none';
    // });
    
    // /* Hungry Seoul */
    // document.querySelectorAll('.est-view-review-hungry-seoul').forEach(function(button) {
    
    //     button.addEventListener('click', function () {
    //         document.getElementById('view-reviewWindow-hungry-seoul').style.display = 'flex';
    //     });
    // });
    
    // document.querySelector('.view-window-container-hungry-seoul .close-button').addEventListener('click', function () {
    //     document.getElementById('view-reviewWindow-hungry-seoul').style.display = 'none';
    // });

  });






