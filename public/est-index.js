function changeText(option) {
      var selectedText = option.textContent;
      var titleElement = document.querySelector('.category-dropdown-title');
      titleElement.textContent = selectedText;
};

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

/* generates view review button class name */
function generateReviewsButtonClass(establishmentName) {
  const name = establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '');
  console.log(`est-view-review-${name} view-review-btn`);
  return `est-view-review-${name} view-review-btn`;
}

/* generates add review button class name */
function generateAddReviewClass(establishmentName) {
    const name = establishmentName.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '');
    console.log(`add-review-${name} add-review-btn`);
    return `add-review-${name} add-review-btn`;
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
  this.reviewsButtonClass = generateReviewsButtonClass(name);
  this.addReviewClass = generateAddReviewClass(name);
};


establishments = [];

establishmentList = establishments;

document.addEventListener('DOMContentLoaded', function() {

/*****************************    VIEW / HIDE MODAL    ****************************/

const createButton = document.getElementById('create-button');
const updateButton = document.getElementById('update-button');
const deleteButton = document.getElementById('delete-button');

const createModal = document.getElementById('create-modal');
const updateModal = document.getElementById('update-modal');

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

  initializeAddReviewWindow(newEstablishment);

  establishments.push(newEstablishment);
  createEstablishmentForm.reset();

  const errorMessageElement = document.querySelector('.create-error-message');
  errorMessageElement.classList.add('create-error-message'); 
  errorMessageElement.textContent = 'Establishment successfully created!';

  console.log(establishments);
  renderEstablishments(establishmentList);
  console.log("New Establishment Created");

});

function initializeAddReviewWindow(newEstablishment) {

  const addContainer = document.querySelector('.add-container');
  const viewContainer = document.querySelector('.view-container');

  const addReviewWindowId = `reviewWindow-${newEstablishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
  const estabName = `${newEstablishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
  console.log("ADD WINDOW ID: " + addReviewWindowId);
  const addHTML = generateAddWindow(addReviewWindowId, newEstablishment, estabName);  

  const viewReviewWindowId = `view-reviewWindow-${newEstablishment.name.replace(/\s+/g, '-').toLowerCase().replace(/'/g, '')}`;
  console.log("VIEW WINDOW ID: " + viewReviewWindowId); 
  const viewHTML = generateViewWindow(viewReviewWindowId, newEstablishment, estabName);  

  viewContainer.innerHTML += viewHTML;
  addContainer.innerHTML += addHTML;

}

    /* add review window html */
  function generateAddWindow(addReviewWindowId, establishment, estabName) {
    // will generate unique IDs for star radio buttons based on establishment name
    const starIds = Array.from({ length: 5 }, (_, i) => `star-${estabName}-${i + 1}`);

    return `
      <!-- Add Review Window -->
      <div id="${addReviewWindowId}" class="review-window-container" style="display: none;">
        <div class="add-review-container"> 
          <img src="/view-establishments-section/assets/est/content-cover/${establishment.coverImage}" class="main-photo">
          <div class="right-side">
            <div class="close-button">
              <img src="/view-establishments-section/assets/est/content-icons/close.png" alt="Close" class="close-icon">
            </div>
            <div class="est-title-header">
              <span class="title">${establishment.name}</span>
              <div class="rating-container">
                <span id="rating">${establishment.rating}</span>
                <img src="/view-establishments-section/assets/est/content-icons/rating-icon.png" alt="rating" class="star-rating">
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
          <img src="/view-establishments-section/assets/est/content-cover/${establishment.coverImage}" alt="${establishment.name}" class="main-photo">
          <div class="view-right-side">
            <div class="close-button">
              <img src="/view-establishments-section/assets/est/content-icons/close.png" alt="Close" class="close-icon">
            </div>
            <div class="view-title-header">
              <span class="title">${establishment.name}</span>
              <div class="rating-container">
                <span id="rating">${establishment.rating}</span>
                <img src="/view-establishments-section/assets/est/content-icons/rating-icon.png" alt="rating" class="star-rating">
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
    establishmentList = filterEstablishmentsByTags(tagsArray);
    renderEstablishments(establishmentList);

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
    establishmentList = filterEstablishmentsByTags(tagsArray);
    renderEstablishments(establishmentList);
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
    
      renderEstablishments(establishmentList);
      console.log("Establishment Updated");

  } else {
      const errorMessageElement = document.querySelector('.update-error-message');
      errorMessageElement.classList.add('update-error-message'); 
      errorMessageElement.textContent = 'Establishment ID not found!';
  }
});

      /*********** GENERATE ESTABLISHMENTS ***********/ 

    renderEstablishments(establishmentList);
      
    function renderEstablishments(establishmentList) {
      const estContainer = document.querySelector('.est-container');
      estContainer.innerHTML = ''; 

      establishmentList.forEach(establishment => {
        const estHTML = generateEstablishmentHTML(establishment);
        estContainer.innerHTML += estHTML; 
      });
    }
    
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

});






