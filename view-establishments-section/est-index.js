
const priceButtons = document.querySelectorAll('.price-button-inner, .price-button-outer-left, .price-button-outer-right');


priceButtons.forEach(button => {
    button.addEventListener('click', togglePriceButtonClick);
});

function togglePriceButtonClick(event) {
    event.target.classList.toggle('price-button-clicked');
    event.target.classList.toggle('price-button-outer-right.price-button-clicked');
    event.target.classList.toggle('price-button-outer-left.price-button-clicked');

}

function changeText(option) {
    var selectedText = option.textContent;
    var titleElement = document.querySelector('.category-dropdown-title');
    titleElement.textContent = selectedText;
}


const input = document.querySelector('#tag-input');
const tagForm = document.querySelector('#tagForm');
const output = document.querySelector('.tags');
const max = document.querySelector('.max');

function outputTag(tagValue) {
    const tag = `
        <span class="tag">
            <b>${tagValue}</b>
            <span class="material-icons-outlined remove-button">
                close
            </span>
        </span>
    `;

    output.innerHTML += tag;
}

tagForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (input.value === "") {
        return; // Exit early if the input is empty
    }

    if (output.children.length >= 4) {
        input.disabled = true;
        input.placeholder = "Max tags reached!";
        return; // Exit early if the maximum number of tags is reached
    }

    const tagValue = input.value.trim(); // Trim whitespace from the input value
    outputTag(tagValue); // Output the tag
    input.value = ""; // Clear the input field
});

input.addEventListener('input', e => {
    const sanitizedValue = input.value.replace(/[^\w]/g, ""); // Remove non-word characters
    input.value = sanitizedValue;
});

window.addEventListener('click', e => {
    if (e.target.classList.contains('remove-button')) {
        e.target.parentElement.remove();
        input.disabled = false;
        input.placeholder = "Add a tag...";
    }
});



document.querySelectorAll('.est-add-review').forEach(function(button) {

    button.addEventListener('click', function () {
        document.getElementById('reviewWindow').style.display = 'flex';
    });
});

document.querySelector('.review-window-container .close-button').addEventListener('click', function () {
    document.getElementById('reviewWindow').style.display = 'none';
});

document.querySelectorAll('.est-view-review').forEach(function(button) {

    button.addEventListener('click', function () {
        document.getElementById('view-reviewWindow').style.display = 'flex';
    });
});

document.querySelector('.view-window-container .close-button').addEventListener('click', function () {
    document.getElementById('view-reviewWindow').style.display = 'none';
});

