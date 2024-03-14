const createButton = document.getElementById('create-button');
const readButton = document.getElementById('read-button');
const updateButton = document.getElementById('update-button');
const deleteButton = document.getElementById('delete-button');

const createModal = document.getElementById('create-modal');
const readModal = document.getElementById('read-modal');
const updateModal = document.getElementById('update-modal');
const deleteModal = document.getElementById('delete-modal');

// Function to show a modal window
function showModal(modal) {
  modal.style.display = 'block';
}

// Function to hide a modal window (can be added if needed)
function hideModal(modal) {
  modal.style.display = 'none';
}

// Add click event listeners to buttons
createButton.addEventListener('click', () => showModal(createModal));
readButton.addEventListener('click', () => showModal(readModal));
updateButton.addEventListener('click', () => showModal(updateModal));
deleteButton.addEventListener('click', () => showModal(deleteModal));

// Add click event listeners to close buttons (optional)
const closeButtons = document.querySelectorAll('.close-button');

closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    const modal = closeButton.parentElement.parentElement; // Get the modal element
    hideModal(modal);
  });
});
