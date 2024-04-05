async function fetchOwnersEstablishments() {
  try {
    const response = await fetch('/owners-establishments'); // Replace with your actual URL
    if (!response.ok) {
      throw new Error(`Error fetching owner's establishments: ${response.statusText}`);
    }
    const establishments = await response.json();
    // Use the fetched establishments data here
  } catch (error) {
    console.error("Error fetching establishments:", error);
    // Handle errors here (e.g., display an error message to the user)
  }
}


/*****************************    CREATE MODAL    ****************************/

// MODIFIED EVENT LISTENER

const createEstablishmentForm = document.querySelector('.create-establishment-form');
const errorMessageElement = document.querySelector('.create-error-message');

createEstablishmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userTagElement = document.getElementById("userTag");
    const userTagName = userTagElement.textContent.trim(); // Get text content and trim whitespace
    console.log("Owner Name:", userTagName);

    const establishmentData = {
      name: document.getElementById('est-name-input').value,
      owner: userTagName,
      rating: '0',
      priceRange: generatePriceRange(document.getElementById('price-range-input').value),
      tags: document.getElementById('tags-input').value.split(','),
      description: document.getElementById('description-input').value,
      coverImage: '', // TODO: add file path
      reviewButtonClass: generateReviewsButtonClass(document.getElementById('est-name-input').value),
      addReviewClass: generateAddReviewClass(document.getElementById('est-name-input').value),
    };
    
    console.log("owner is: " + establishmentData.owner);
    console.log("Fetching /create-establishment...");

    try {
      const response = await fetch('/create-establishment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(establishmentData)
      });
    
      if (response.ok) {
        console.log("Establishment created successfully");
        errorMessageElement.textContent = 'Establishment successfully created!';
        createEstablishmentForm.reset();
      } else {
        throw new Error(`Error creating establishment: ${response.statusText}`);
      }
    
    } catch (error) {
      errorMessageElement.textContent = 'Error creating establishment.';
      console.error("Error creating establishment:", error);
    }
});

// ----------------------------------------------------------------------------
