document.getElementById('orderButton').addEventListener('click', function() {
    const size = document.getElementById('size');
    const base = document.getElementById('base');
    const sweetener = document.getElementById('sweetener');
    
    const sizePrice = parseFloat(size.options[size.selectedIndex].getAttribute('data-price'));
    const basePrice = parseFloat(base.options[base.selectedIndex].getAttribute('data-price'));
    const sweetenerPrice = parseFloat(sweetener.options[sweetener.selectedIndex].getAttribute('data-price'));
    
    const ingredients = [];
    let ingredientsPrice = 0;
    
    document.querySelectorAll('input[name="ingredients"]:checked').forEach((ingredient) => {
        ingredients.push(ingredient.value);
        ingredientsPrice += parseFloat(ingredient.getAttribute('data-price'));
    });

    const notes = document.getElementById('notes').value;
    
    const smoothie = new Smoothie(size.value, base.value, ingredients, sweetener.value, notes);
    displayOrder(smoothie, sizePrice, basePrice, sweetenerPrice, ingredientsPrice);
});

class Smoothie {
    constructor(size, base, ingredients, sweetener, notes) {
        this.size = size;
        this.base = base;
        this.ingredients = ingredients;
        this.sweetener = sweetener;
        this.notes = notes;
    }

    getDescription() {
        return `
            <strong>Size:</strong> ${this.size} <br>
            <strong>Base:</strong> ${this.base} <br>
            <strong>Ingredients:</strong> ${this.ingredients.join(', ')} <br>
            <strong>Sweetener:</strong> ${this.sweetener} <br>
            <strong>Notes:</strong> ${this.notes} <br>
        `;
    }
}

function displayOrder(smoothie, sizePrice, basePrice, sweetenerPrice, ingredientsPrice) {
    const subtotal = sizePrice + basePrice + sweetenerPrice + ingredientsPrice;
    const tax = subtotal*0.13;
    const total = subtotal+tax;

    document.getElementById('orderSummary').innerHTML = `<strong>Order summary: </strong><br><br> ${smoothie.getDescription()}`;
    
    const bill = `
        <strong>Size Price:</strong> $${sizePrice.toFixed(2)} <br>
        <strong>Base Price:</strong> $${basePrice.toFixed(2)} <br>
        <strong>Ingredients Price:</strong> $${ingredientsPrice.toFixed(2)} <br>
        <strong>Sweetener Price:</strong> $${sweetenerPrice.toFixed(2)} <br><br>
        <strong>Subtotal:</strong> $${subtotal.toFixed(2)} <br>
        <strong>Tax(13%):</strong>$${tax.toFixed(2)} <br><br>
        <strong><u>Total Cost:</u></strong> $${total.toFixed(2)}
    `;
    document.getElementById('bill').innerHTML = `<strong>Bill: </strong><br><br> ${bill}`;;
    
    // Display a visual representation of the smoothie
    displaySmoothieImage(smoothie);
    
    // Add a fun element: Random smoothie suggestion
    suggestRandomSmoothie();
}

function displaySmoothieImage(smoothie) {
    let imageUrl = 'img/default-smoothie.png'; // Default image if no specific image found

    // Simple logic to select image based on base
    switch (smoothie.base) {
        case 'Milk':
            imageUrl = 'img/milk-smoothie.png';
            break;
        case 'Almond milk':
            imageUrl = 'img/almond-milk-smoothie.png';
            break;
        case 'Soy milk':
            imageUrl = 'img/soy-milk-smoothie.png';
            break;
        case 'Juice':
            imageUrl = 'img/juice-smoothie.png';
            break;
    }

    // Set image source and display it
    document.getElementById('smoothieImage').innerHTML = `<img src="${imageUrl}" alt="Smoothie Image">`;
}

function suggestRandomSmoothie() {
    const suggestions = [
        "Try adding chia seeds for extra nutrients!",
        "How about a protein boost with some whey powder?",
        "Mix in some yogurt for a creamy texture!",
        "Add a sprinkle of cinnamon for a spicy kick!",
    ];

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    document.getElementById('funElement').innerHTML = `<strong>Fun Tip:</strong> ${randomSuggestion}`;
}
