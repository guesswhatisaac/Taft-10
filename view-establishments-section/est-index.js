
const priceButtons = document.querySelectorAll('.price-button-inner, .price-button-outer-left, .price-button-outer-right');


priceButtons.forEach(button => {
    button.addEventListener('click', togglePriceButtonClick);
});

function togglePriceButtonClick(event) {
    event.target.classList.toggle('price-button-clicked');
}
