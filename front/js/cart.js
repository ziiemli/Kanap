//recover localStorage
//reading localStorage and transform JSON in JS or create new table if it doesn't exist
let registeredItem = JSON.parse(localStorage.getItem("item")) || [];
console.log(registeredItem);

//_____Recover products from API
async function recoverProducts(item) {
    await fetch(`http://localhost:3000/api/products/${item.idValue}`)
        //transform JSON format
        .then(response => response.json())
        //data
        .then(data => {
            data;
            item.name = data.name;
            item.price = data.price;
            // console.log(item.price);
            item.imageUrl = data.imageUrl;
            item.altTxt = data.altTxt;
            item.description = data.description;
        })
};

const itemsDisplay = () => {
    registeredItem.map(async item => {
        await recoverProducts(item);
        document.getElementById("cart__items").innerHTML += 
        `<article class="cart__item" data-id="${item.idValue}" data-color="${item.colorValue}">
            <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.colorValue}</p>
                <p>${item.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantityValue}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
      </article>`
    })
}
itemsDisplay();


var totalPrice = [];
var totalQuantity = [];
//_____Display Total Price and Quantity
const displayTotalPrice = () => {
        registeredItem.map(async item => {
        await recoverProducts(item);
        price = parseInt(item.price)*parseInt(item.quantityValue);
        console.log(price);
        totalPrice.push(price);
    })
    
    console.log(totalPrice);
} 
displayTotalPrice();


// //calculate Total of Price
const displayPrice = totalPrice.reduce((previousValue, currentValue) => {
    return (previousValue, + currentValue);
});
console.log(displayPrice);


//_____FORM
function form () {
    //select input Tag
    let formInput = document.getElementsByTagName("input");

    //select each input
    const firstName = formInput.firstName;
    const lastName = formInput.lastName;
    const address = formInput.address;
    const city = formInput.city;
    const email = formInput.email;
    
    //creation RegEx
    let firstNameRegEx = /^([A-Za-zÀ-Üà-ü-\s]{2,20})$/g;
    let lastNameRegEx = /^([A-Za-zÀ-Üà-ü-\s]{2,20})$/g;
    let addressRegEx =/^([0-9\s]{0,4})+([A-Za-zÀ-Üà-ü-.\s]{2,60})$/g;
    let cityRegEx =/^([A-Za-zÀ-Üà-ü-.'\s]{2,40})$/g;
    let emailRegEx = /^([\w!#$%&'*+/=?^`{|}~-]{2}(?:[.]?[\w!#$%&'*+/=?^`{|}~-]){0,60})@([a-z]{2,246}[a-z.-]?)+([.][a-z]{2,3})$/g;
    
    //True/False Value First Name 
    firstName.addEventListener("change", () => {
        if (firstNameRegEx.test(firstName.value)) {
        }
        else {
            document.getElementById("firstNameErrorMsg").innerHTML = `Veuillez renseigner un prénom valide`
        }
    })
    //True/False Value Last Name 
    lastName.addEventListener("change", () => {
        if (lastNameRegEx.test(lastName.value)) {
        }
        else {
            document.getElementById("lastNameErrorMsg").innerHTML = `Veuillez renseigner un nom valide`
        }
    })
    //True/False Value Address Name
    address.addEventListener("change", () => {
        if (addressRegEx.test(address.value)) {
        }
        else {
            document.getElementById("addressErrorMsg").innerHTML = `Veuillez renseigner une adresse valide`
        }
    })
    //True/False Value City Name
    city.addEventListener("change", () => {
        if (cityRegEx.test(city.value)) {
        }
        else {
            document.getElementById("cityErrorMsg").innerHTML = `Veuillez renseigner une ville valide`
        }
    })
    //True/False Value Email Name
    email.addEventListener("change", () => {
        if (emailRegEx.test(email.value)) {
        }
        else {
            document.getElementById("emailErrorMsg").innerHTML = `Veuillez renseigner une adresse email valide`
        }
    })

}
form();





    
    
