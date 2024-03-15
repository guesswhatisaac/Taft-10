
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

const generatePriceRange = (priceRange) => {

  if(priceRange == 1){
    return ['₱', '₱₱₱'];
  }
  else if(priceRange == 2){
    return ['₱₱', '₱₱'];
  }
  else if(priceRange == 3){
    return ['₱₱₱', '₱'];    
  }
  else if(priceRange == 4){
    return ['₱₱₱₱', ''];
  }
}

const generateEstablishmentId = () => {
  return establishments.length + 1;
};

const getEstablishmentOwner = () => {
  // TODO
}

const Establishment = function(name, priceRange, tags, description, coverImage) {
this.id = generateEstablishmentId(); 
this.name = name;
this.establishmentOwner = 'SINO BA'; // TODO
this.rating = 0;
this.priceRange = generatePriceRange(priceRange);
this.tags = tags;
this.description = description;
this.coverImage = coverImage; // TODO: Only adds cover image if it exists in assets folder, uploaded images not added
this.reviewsButtonClass = 'NONE NONE'; // TODO
};

const establishments = [];

// preloaded establishments
establishments.push(new Establishment(
  '24 Chicken', 1, ['Filipino', 'Chicken'],
'If you\'re on the hunt for a chicken experience that transcends the ordinary, look no further than 24 Chicken.',
'24Chicken.png'));

establishments.push(new Establishment(
  "Ate Rica's Bacsilog", 1, ['Filipino', 'Rice Meal'], 
  'Ate Rica\'s Bacsilog lives up to its "Sauce Sarap" promise! Delicious, affordable Filipino comfort food with generous portions and...',
  'AteRicasBacsilog.png'));

establishments.push(new Establishment(
  'Tomo Coffee', 1, ['Drinks'],
  'Tucked away in a vibrant student district, Tomo Coffee is a haven for caffeine-craving scholars. I love it so much!',
  'TomoCoffee.png',
  'est-view-review-tomo viewReviewBtn'));

establishments.push(new Establishment(
  'Tinuhog ni Benny', 1, ['Filipino', 'Rice Meal'],
  'Tinuhog ni Benny is a haven for budget-friendly, delicious Filipino comfort food. The highlight is undoubtedly their namesake "tinuhog"...',
  'TinuhogNiBenny.png'));
  
establishments.push(new Establishment(
  'Hungry Seoul', 2, ['Korean', 'Rice Meal'],
  'If you\'re craving a taste of Korea in Manila, Hungry Seoul is definitely worth a visit. This casual restaurant...',
  'HungrySeoul.png'));


  establishmentList = establishments;

document.addEventListener('DOMContentLoaded', function() {

/*****************************    VIEW / HIDE MODAL    ****************************/

const createButton = document.getElementById('create-button');
const updateButton = document.getElementById('update-button');
const deleteButton = document.getElementById('delete-button');

const createModal = document.getElementById('create-modal');
const updateModal = document.getElementById('update-modal');
const deleteModal = document.getElementById('delete-modal');

function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)'; // Add background color on open

  }
  
function hideModal(modal) {
    
    document.body.style.backgroundColor = 'inherit'; // Remove background color on close
    modal.style.display = 'none';

    const createErrorMessageElement = document.querySelector('.create-error-message');
    createErrorMessageElement.classList.add('create-error-message'); 
    createErrorMessageElement.textContent = '';

    const updateErrorMessageElement = document.querySelector('.update-error-message');
    updateErrorMessageElement.classList.add('update-error-message'); 
    updateErrorMessageElement.textContent = '';

    const deleteErrorMessageElement = document.querySelector('.delete-error-message');
    deleteErrorMessageElement.classList.add('delete-error-message'); 
    deleteErrorMessageElement.textContent = '';

  }

createButton.addEventListener('click', () => showModal(createModal));
updateButton.addEventListener('click', () => showModal(updateModal));
deleteButton.addEventListener('click', () => showModal(deleteModal));

const closeButtons = document.querySelectorAll('.close-button');

closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    const modal = closeButton.parentElement.parentElement.parentElement; // Get the modal element
    hideModal(modal);
  });
});

/*****************************    CREATE MODAL    ****************************/

const createEstablishmentForm = document.querySelector('.create-establishment-form');

createEstablishmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const estName = document.getElementById('est-name-input').value;
  const priceRange = document.getElementById('price-range-input').value;
  const tags = document.getElementById('tags-input').value.split(','); // Split tags by comma
  const description = document.getElementById('description-input').value;
  const coverImage = 'placeholder.png'; // Access the selected file

  const newEstablishment = new Establishment(estName, priceRange, tags, description, coverImage);
  establishments.push(newEstablishment);

  createEstablishmentForm.reset();

  const errorMessageElement = document.querySelector('.create-error-message');
  errorMessageElement.classList.add('create-error-message'); 
  errorMessageElement.textContent = 'Establishment successfully created!';

  console.log(establishments);
  renderEstablishments(establishmentsList);
  console.log("New Establishment Created");
  
  

});

/*****************************    SEARCH MODAL (SEARCH BAR)    ****************************/

// .search-form (search bar to find establishments)

// if search form is empty, establishmentList = establishments
// if search form has establishment name, establishmentList = (establishments that match the name) 
  // note: Establishment has 'name' attribute

  document.querySelector('.search-form').addEventListener('input', handleSearch);

// filter establishments based on search term
function searchEstablishments(searchTerm) {
  searchTerm = searchTerm.toLowerCase().trim();
  if (searchTerm === "") {
      return establishments; // return all establishments if search term is empty
  } else {
      return establishments.filter(establishment =>
          establishment.name.toLowerCase().includes(searchTerm)
      );
  }
}

  // Function to handle search
  function handleSearch() {
    const searchInput = document.querySelector('.search-form').value;
    const searchResults = searchEstablishments(searchInput);
    renderEstablishments(searchResults); 
  }


// #tag-input (store)

/********************** ADD TAGS **********************/
const input = document.querySelector('#tag-input');
const tagForm = document.querySelector('#tagForm');
const output = document.querySelector('.tags');
const max = document.querySelector('.max');

// Array to store tags
const tagsArray = [];

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

    // Add tag to tagsArray
    tagsArray.push(tagValue);
}

tagForm.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value === "") {
        return;
    }

    if (output.children.length == 5) {
        input.disabled = true;
        input.value = "";
        input.placeholder = "Max tags reached!";
        return;
    } 

    const tagValue = input.value.trim();
    outputTag(tagValue);
    input.value = "";

    console.log(filterEstablishmentsByTags(tagsArray));
    establishmentsList = filterEstablishmentsByTags(tagsArray);
    renderEstablishments(establishmentsList);

});

input.addEventListener('input', e => {
    const sanitizedValue = input.value.replace(/[^\w]/g, "");
    input.value = sanitizedValue;
});

window.addEventListener('click', e => {
    if (e.target.classList.contains('remove-button')) {
        const removedTagValue = e.target.parentElement.querySelector('b').textContent;
        const index = tagsArray.indexOf(removedTagValue);
        if (index !== -1) {
            tagsArray.splice(index, 1);
        }
        e.target.parentElement.remove();
        input.disabled = false;
        input.placeholder = "Add a tag...";
    }
    console.log(filterEstablishmentsByTags(tagsArray));
    establishmentsList = filterEstablishmentsByTags(tagsArray);
    renderEstablishments(establishmentsList);
});

// filter with tags
function filterEstablishmentsByTags(tagsArray) {

  let filteredEstablishments = [];

  if (tagsArray.length === 0) {
      filteredEstablishments = establishments; // If tagsArray is empty, return all establishments
  } else {
      for (let i = 0; i < establishments.length; i++) {
          let establishment = establishments[i];
          let includeEstablishment = true;
          for (let j = 0; j < tagsArray.length; j++) {
              let tag = tagsArray[j];
              if (!establishment.tags.includes(tag)) {
                  includeEstablishment = false;
                  break;
              }
          }
          if (includeEstablishment) {
              filteredEstablishments.push(establishment);
          }
      }
  }

  console.log(filteredEstablishments);
  return filteredEstablishments;
}

/*****************************    UPDATE MODAL    ****************************/

document.querySelector('.update-establishment-form').addEventListener('submit', function(event) {

  event.preventDefault();

  const id = document.querySelector('#est-id-input').value;
  const name = document.querySelector('#update-est-name').value;
  const priceRange = document.querySelector('#update-price-range').value;
  const tags = document.querySelector('#update-tags').value.split(',').map(tag => tag.trim());
  const description = document.querySelector('#update-description').value;
  const coverImage = document.querySelector('#update-cover-image').files[0];

  console.log(establishments);
  const establishmentToUpdate = establishments.find(establishment => establishment.id == id);
  console.log(establishmentToUpdate);

  if (establishmentToUpdate) {
      establishmentToUpdate.name = name;
      establishmentToUpdate.priceRange = generatePriceRange(priceRange);
      establishmentToUpdate.tags = tags;
      establishmentToUpdate.description = description;
      if (coverImage) {
          // TODO
      }

      document.querySelector('.update-establishment-form').reset();
      
      const errorMessageElement = document.querySelector('.update-error-message');
      errorMessageElement.classList.add('update-error-message'); 
      errorMessageElement.textContent = 'Establishment successfully updated!';
    
      renderEstablishments(establishmentsList);
      console.log("Establishment Updated");

  } else {
      const errorMessageElement = document.querySelector('.update-error-message');
      errorMessageElement.classList.add('update-error-message'); 
      errorMessageElement.textContent = 'Establishment ID not found!';
  }
});


/*****************************    DELETE MODAL    ****************************/







     /********************** GENERATE ESTABLISHMENTS **********************/ 

    renderEstablishments(establishmentList);
    
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

    function renderEstablishments(establishmentList) {
      const estContainer = document.querySelector('.est-container');
      estContainer.innerHTML = ''; 

      establishmentList.forEach(establishment => {
        const estHTML = generateEstablishmentHTML(establishment);
        estContainer.innerHTML += estHTML; 
      });
    }
   
    /********************** ADD & VIEW REVIEW **********************/ 
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

        // for debugging
        console.log("array length: " + reviews.length);

        renderReviews();
    
        document.getElementById('comment').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('reviewWindow').style.display = 'none';

        // for debugging
        console.log("IM HERE");
    });

    function generateReviewHTML(review) {
        // for debugging
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






