//_____Recover querystring url id
//return the URL of the current page
const querystring = new URL (window.location.href);
//return id of the URL
const productID = querystring.searchParams.get("id");

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
        console.log(article);
    })
}

//_____Display article
const articleDisplay = async function () {
    await recoverArticle();
    //img
    document.querySelector(".item__img").innerHTML = 
    `<img src="${article.imageUrl}" alt="${article.altTxt}">`
    //title
    document.getElementById("title").innerHTML = 
    `${article.name}`
    //price
    document.getElementById("price").innerHTML = 
    `${article.price}`
    //description
    document.getElementById("description").innerHTML = 
    `${article.description}`
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
    console.log(color);
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
            registeredItem.push(newItem);
            localStorage.setItem("item", JSON.stringify(registeredItem));
        }
        //else alert message
        else {
            alert("Veuiller renseigner une quantité et une couleur");
        }

        console.log(registeredItem);

    })
}



// let selectQuantity = document.getElementById("quantity");
// let selectColor = document.getElementById("colors");

//     if (selectQuantity > 0 && selectColor > 0) {
//     }
//     addItem();
// function addItem() {
//     let productNumbers = localStorage.getItem("itemNumbers");
//     localStorage.setItem("addItem", 1);
// }


//JSON.stringify = convertir les données JS en JSON
