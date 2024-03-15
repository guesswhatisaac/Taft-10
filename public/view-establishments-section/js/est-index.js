const establishments = [
  {
    name: '24 Chicken',
    rating: '4.9',
    priceRange: ['₱₱', '₱₱'],
    tags: ['Filipino', 'Chicken'],
    description: 'If you\'re on the hunt for a chicken experience that transcends the ordinary, look no further than 24 Chicken.',
    coverImage: '24Chicken.png',
    reviewsButtonClass: 'est-view-review-24-chicken view-review-btn',
    addReviewClass: 'add-review-24-chicken add-review-btn'
  },
  {
    name: "Ate Rica's Bacsilog",
    rating: '4.9',
    priceRange: ['₱', '₱₱₱'],
    tags: ['Filipino', 'Rice Meal'],
    description: 'Ate Rica\'s Bacsilog lives up to its "Sauce Sarap" promise! Delicious, affordable Filipino comfort food with generous portions and...',
    coverImage: 'AteRicasBacsilog.png',
    reviewsButtonClass: 'est-view-review-ate-ricas-bacsilog view-review-btn',
    addReviewClass: 'add-review-ate-ricas-bacsilog add-review-btn'
  },
  {
    name: 'Tomo Coffee',
    rating: '4.7',
    priceRange: ['₱₱', '₱₱'],
    tags: ['Drinks'],
    description: 'Tucked away in a vibrant student district, Tomo Coffee is a haven for caffeine-craving scholars. I love it so much!',
    coverImage: 'TomoCoffee.png',
    reviewsButtonClass: 'est-view-review-tomo-coffee view-review-btn',
    addReviewClass: 'add-review-tomo-coffee add-review-btn'
  },
  {
    name: 'Tinuhog ni Benny',
    rating: '5.0',
    priceRange: ['₱', '₱₱₱'],
    tags: ['Filipino', 'Rice Meal'],
    description: 'Tinuhog ni Benny is a haven for budget-friendly, delicious Filipino comfort food. The highlight is undoubtedly their namesake "tinuhog"...',
    coverImage: 'TinuhogNiBenny.png',
    reviewsButtonClass: 'est-view-review-tinuhog-ni-benny view-review-btn',
    addReviewClass: 'add-review-tinuhog-ni-benny add-review-btn'
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

      /* responsible for creating htmls of establishments including their own Add Review and View Review windows */
      function renderEstablishments() {
        const estContainer = document.querySelector('.est-container');
        const addContainer = document.querySelector('.add-container');
        const viewContainer = document.querySelector('.view-container');

        establishments.forEach(establishment => {
            const estHTML = generateEstablishmentHTML(establishment);
            const estId = `${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;

            const addReviewWindowId = `reviewWindow-${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
            const estabName = `${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
            console.log("ADD WINDOW ID: " + addReviewWindowId);
            const addHTML = generateAddWindow(addReviewWindowId, establishment, estabName);  

            const viewReviewWindowId = `view-reviewWindow-${establishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
            console.log("VIEW WINDOW ID: " + viewReviewWindowId);
            const viewHTML = generateViewWindow(viewReviewWindowId, establishment, estId);

            estContainer.innerHTML += estHTML;
            addContainer.innerHTML += addHTML;
            viewContainer.innerHTML += viewHTML;
        });
      }
      
      /* establishment container html */
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
              <div class="${establishment.addReviewClass}">Add Review</div>
              <div class="${establishment.reviewsButtonClass}">View Review</div>
            </div>
          </div>
        `;
      }

      /* add review window html */
      function generateAddWindow(addReviewWindowId, establishment, estabName) {

        // will generate unique IDs for star radio buttons based on establishment name
        const starIds = Array.from({ length: 5 }, (_, i) => `star-${estabName}-${i + 1}`);

        return `
          <!-- Add Review Window -->
          <div id="${addReviewWindowId}" class="review-window-container" style="display: none;">
            <div class="add-review-container"> 
              <img src="../assets/est/content-cover/${establishment.coverImage}" class="main-photo">
              <div class="right-side">
                <div class="close-button">
                  <img src="../assets/est/content-icons/close.png" alt="Close" class="close-icon">
                </div>
                <div class="est-title-header">
                  <span class="title">${establishment.name}</span>
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
                      ${starIds.map((id, index) => `
                          <input type="radio" id="${id}" name="rating" value="${index + 1}">
                          <label for="${id}"></label>
                      `).join('')}
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
                    <textarea class="comment-content" id="comment" name="comment" rows="25" cols="50" placeholder="Write a review..."></textarea>
                  </div>
                  <div class="bottom">
                    <label for="upload" class="custom-upload"> Add a Photo or Video </label>
                    <input type="file" accept="image/*, video/*" id="upload" name="upload" style="display:none;">
                    <button class="submit-button" id="submit-${estabName}">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    
      /* view window html */
      function generateViewWindow(viewReviewWindowId, establishment, estId) {
        return `
          <!-- View Review Window -->
          <div id="${viewReviewWindowId}" class="view-window-container" style="display: none;">
            <div class="view-review-container"> 
              <img src="../assets/est/content-cover/${establishment.coverImage}" alt="${establishment.name}" class="main-photo">
              <div class="view-right-side">
                <div class="close-button">
                  <img src="../assets/est/content-icons/close.png" alt="Close" class="close-icon">
                </div>
                <div class="view-title-header">
                  <span class="title">${establishment.name}</span>
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
                <div class="view-review-placeholder-${estId}"> </div>
              </div>
            </div>   
          </div>
        `;
      }

      /********************** ADD & VIEW REVIEW **********************/ 
      // let establishmentName = '';

      /* event listener for Add Review buttons */
      document.querySelectorAll('.add-review-btn').forEach(function(button) {
        button.addEventListener('click', function () {
            const establishmentName = button.closest('.est-content').querySelector('.est-title').textContent.trim();
            const reviewWindowId = `reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
            document.getElementById(reviewWindowId).style.display = 'flex';
        });
      });

      /* event listener for View Review buttons */
      document.querySelectorAll('.view-review-btn').forEach(function(button) {
        button.addEventListener('click', function () {
          const establishmentName = button.closest('.est-content').querySelector('.est-title').textContent.trim();
          const viewReviewWindowId = `view-reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
          document.getElementById(viewReviewWindowId).style.display = 'flex';
        });
      });

      /* closes Add Review window */
      document.querySelectorAll('.close-button').forEach(function(button) {
        button.addEventListener('click', function() {
          const establishmentName = button.closest('.review-window-container').querySelector('.title').textContent.trim();
          const reviewWindow = `reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
          console.log("ADD Window: " + reviewWindow);
          document.getElementById(reviewWindow).style.display = 'none';
        });
      });

      /* closes View Review window */
      document.querySelectorAll('.close-button').forEach(function(button) {
        button.addEventListener('click', function() {
          const establishmentName = button.closest('.view-window-container').querySelector('.title').textContent.trim();
          const reviewWindow = `view-reviewWindow-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
          console.log("VIEW Window: " + reviewWindow);
          document.getElementById(reviewWindow).style.display = 'none';
        });
      });
      
      /* executed when a user submits a new review */
      document.querySelectorAll('.submit-button').forEach(function(button) {
        button.addEventListener('click', function () {
            console.log("SUBMIT BUTTON CLICKED")

            const username = "User";
            const rating = document.querySelector('input[name="rating"]:checked').value;
            
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date().toLocaleDateString('en-US', options);

            const content = this.closest('.review-window-container').querySelector('.comment-content').value;

            const establishmentName = this.closest('.review-window-container').querySelector('.est-title-header span.title').textContent.trim().replace(/\s+/g, '-').toLowerCase().replace(/'/g, '');
            console.log("ESTABLISHMENT NAME: " + establishmentName);
    
            const newReview = new Review(username, rating, date, content, establishmentName);
            reviews.push(newReview);
    
            renderReviews(establishmentName);
    
            this.closest('.review-window-container').querySelector('.comment-content').value = '';
            document.querySelector(`#reviewWindow-${establishmentName}`).style.display = 'none';
        });
      });
      
      /* when new review has been added by a user, this function will be called */
      function renderReviews(establishmentName) {
        const container = document.querySelector(`.view-review-placeholder-${establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`);
        container.innerHTML = '';
    
        const establishmentReviews = reviews.filter(review => review.establishmentName === establishmentName);
    
        establishmentReviews.forEach(review => {
            const reviewHTML = generateReviewHTML(review);
            container.innerHTML += reviewHTML;
        });
      }

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
    });






