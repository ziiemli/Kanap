//_____PRODUCT_____//

//_____Recover querystring url id
//return the URL of the current page
let querystring = new URL (window.location.href);
//return id of the URL
let productID = querystring.searchParams.get("id");

let article = [];
//_____Recover informations of a good product
const recoverArticle = async function () {
    //inject ID of product
    await fetch(`http://localhost:3000/api/products/${productID}`)
    //transform JSON format
    .then(response => response.json())
    //data
    .then(data => {
        article = data;
    })
    .catch( () => {
        alert("Une erreur est survenue, veuillez réessayer ultérieurement.")
    })
}

//_____Display article
const articleDisplay = async function () {
    await recoverArticle()
    //img
    let imageContainer = document.getElementsByClassName("item__img");
    let image = document.createElement("img");
    image.src = article.imageUrl;
    image.alt = article.altTxt;
    imageContainer[0].appendChild(image);
    //title
    let titleContainer = document.getElementById("title");
    let titleText = document.createTextNode(`${article.name}`);
    titleContainer.appendChild(titleText);
    //price
    let priceContainer = document.getElementById("price");
    let priceText = document.createTextNode(`${article.price}`);
    priceContainer.appendChild(priceText);
    //description
    let descriptionContainer = document.getElementById("description");
    let descriptionText = document.createTextNode(`${article.description}`);
    descriptionContainer.appendChild(descriptionText);
    //colors_____
    //recover different colors of product
    const colors = article.colors;
    //loop = action for each color of product
    const color = colors.forEach(color => {
        //add option tag
        let newOption = document.createElement("option");
        //insert in color
        newOption.innerHTML = `${color}`;
        //add option tag with color in ID "colors"
        document.getElementById("colors").appendChild(newOption);
    });

    //function add item to cart
    addItemToCart();
};
articleDisplay();
    

//_____Add to cart 
//localstorage

function addItemToCart() {

    //call elements to have selected informations
    const selectID = productID;
    const selectColor = document.getElementById("colors");
    const selectQuantity = document.getElementById("quantity");
    
    //call button
    let button = document.getElementById("addToCart"); 
    
    //add item when click on the button
    button.addEventListener("click", () => {
        //reading localStorage and transform JSON in JS or create new table if it doesn't exist
        let registeredItem = JSON.parse(localStorage.getItem("item")) || [];

        //selected informations of item
        let newItem = {
            idValue: selectID,
            colorValue: selectColor.value,
            quantityValue: selectQuantity.value,
        };
        
        //if color is defined and 100 > quantity > 0
        if (selectColor.value !== "" && 100 > selectQuantity.value && selectQuantity.value > 0){
            //compare the selected product and the localStorage product
            let sameProduct = registeredItem.find(p => 
                productID === p.idValue && 
                selectColor.value === p.colorValue
            );
            //if same item in localStorage > modify quantity
            if (sameProduct) {
                //add localStorage item quantity and quantity selected, parseInt > transform string in entire number
                newQuantity = parseInt(sameProduct.quantityValue) + parseInt(selectQuantity.value);

                //assign newQuantity of localStorage product
                sameProduct.quantityValue = newQuantity;

                //return data in localStorage
                localStorage.setItem("item", JSON.stringify(registeredItem));
            }
            //else > add newItem
            else {
                registeredItem.push(newItem);
                localStorage.setItem("item", JSON.stringify(registeredItem));
            }
            alert("Le produit a été ajouté au panier")
        }
        //else alert message
        else {
            alert("Veuiller renseigner une quantité valide et une couleur");
        }

    })
}

