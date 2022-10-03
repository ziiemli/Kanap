//recover localStorage
//reading localStorage and transform JSON in JS or create new table if it doesn't exist
let registeredItem = JSON.parse(localStorage.getItem("item")) || [];
console.log(registeredItem);

//_____Cart init
const cartInit = () => {
    //loop through localStorage to recover each informations of item
    Promise.all(registeredItem.map(async item => {
        const r = await recoverProducts(item);
        return r;
    })).then((data) => {
        //call functions with data as parameters
        itemsDisplay(data);
        totalDisplay(data);
       console.log(data);
    })
}
cartInit();

//_____Recover item informations from API and add infos of localStorage
async function recoverProducts(item) {
    //call data API
    const result = await fetch(`http://localhost:3000/api/products/${item.idValue}`);
    //transform data result in JSON
    const obj = await result.json();
    //add quantityValue and colorValue from localStorage to obj
    obj.quantity = item.quantityValue;
    obj.color = item.colorValue;
    return obj;
};

//_____Items Display
const itemsDisplay = (data) => {
    //loop through data to display each product
    data.forEach( item => {
        document.getElementById("cart__items").innerHTML += 
        `<article class="cart__item" data-id="${item.idValue}" data-color="${item.colorValue}">
            <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${item.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
      </article>`
    })
}

//display sumPrices and quantity 
function totalDisplay (data) {
    //init totalQuantity and totalPrice
    let totalQuantity = 0;
    let totalPrice = 0;
    //loop through data to calculate totalQuantity and totalPrice
    data.forEach(d => {
        totalQuantity += d.quantity
        totalPrice += d.price * d.quantity
    })
    //display totalQuantity and totalPrice
    document.getElementById("totalPrice").innerText = totalPrice
    document.getElementById("totalQuantity").innerText = totalQuantity
}


//_____FORM
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
//Verify formValues
function form () { 
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

const formValues = {
    firstNameValue: firstName.value,
    lastNameValue: lastName.value,
    addressValue: address.value,
    cityValue: city.value,
    emailValue: email.value
}

console.log(formValues);

const sendOrder = {
    formValues, registeredItem
};

// const p = () => {
//     fetch (`http://localhost:3000/api/products/order`, {
//         method: "POST"
//         body: JSON.stringify(sendOrder),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
// }



    
    
