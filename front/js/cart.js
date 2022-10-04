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
        const displayCard = document.getElementById("cart__items");
        //create HTML Product Card
        //_____Article
        const article = document.createElement("article");
        article.classList = "cart__item";
        article.dataset.id = item._id;
        article.dataset.color = item.color;

        //____Image
        const imageContainer = document.createElement("div");
        imageContainer.classList = "cart__item__img";
        article.appendChild(imageContainer);

        const image = document.createElement("img")
        image.src = item.imageUrl;
        image.alt = item.altTxt;
        imageContainer.appendChild(image);

        //___informations Container
        const informationsContainer = document.createElement("div");
        informationsContainer.classList = "cart__item__content";
        article.appendChild(informationsContainer);
        
        //__informations description content
        const descriptionContent = document.createElement("div");
        descriptionContent.classList = "cart__item__content__description";
        informationsContainer.appendChild(descriptionContent);

        //h2
        const descriptionName = document.createElement("h2");
        const descriptionNameText = document.createTextNode(`${item.name}`);
        descriptionName.appendChild(descriptionNameText);
        descriptionContent.appendChild(descriptionName);
        //color
        const descriptionColor = document.createElement("p");
        const descriptionColorText = document.createTextNode(`${item.color}`);
        descriptionColor.appendChild(descriptionColorText);
        descriptionContent.appendChild(descriptionColor);
        //price
        const descriptionPrice = document.createElement("p");
        const descriptionPriceText = document.createTextNode(`${item.price} €`);
        descriptionPrice.appendChild(descriptionPriceText);
        descriptionContent.appendChild(descriptionPrice);

        //__informations settings content
        const settingsContent = document.createElement("div");
        settingsContent.classList = "cart__item__content__settings";
        informationsContainer.appendChild(settingsContent);

        //__quantity
        const settingsQuantity = document.createElement("div");
        settingsQuantity.classList = "cart__item__content__settings__quantity";
        settingsContent.appendChild(settingsQuantity);

        const quantity = document.createElement("p");
        const quantityText = document.createTextNode(`Qté : `);
        quantity.appendChild(quantityText);
        settingsQuantity.appendChild(quantity);
        
        const inputQuantity = document.createElement("input")
        inputQuantity.type = "number";
        inputQuantity.classList = "itemQuantity";
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = 1;
        inputQuantity.max = 100;
        inputQuantity.value = item.quantity;
        settingsQuantity.appendChild(inputQuantity);
        
        //delete
        const settingsDelete = document.createElement("div")
        settingsDelete.classList = "cart__item__content__settings__delete";
        settingsContent.appendChild(settingsDelete);
        
        const Delete = document.createElement("p");
        Delete.classList = "cart__item__content__settings__delete"
        const DeleteText = document.createTextNode("Supprimer");
        DeleteText.classList = "deleteItem";
        Delete.appendChild(DeleteText);
        settingsDelete.appendChild(Delete);

        //Article to display Card
        displayCard.appendChild(article);


        //_____CHANGE QUANTITY_____//
        inputQuantity.addEventListener("change", event => {
            changeQuantity(event.target, item);
        })
        
    })
}

//_____display sumPrices and quantity 
function totalDisplay (data) {
    //init totalQuantity and totalPrice
    let totalQuantity = 0;
    let totalPrice = 0;
    //loop through data to calculate totalQuantity and totalPrice
    data.forEach(d => {
        totalQuantity += parseInt(d.quantity);
        totalPrice += parseInt(d.price) * parseInt(d.quantity);
    })
    //display totalQuantity and totalPrice
    document.getElementById("totalPrice").innerText = totalPrice
    document.getElementById("totalQuantity").innerText = totalQuantity
}

//____Change quantity
function changeQuantity (event, item) {
    

    let sameProduct = registeredItem.find(p => 
        item._id === p.idValue && 
        item.color === p.colorValue
    );
    //if same item in localStorage > modify quantity
    if (sameProduct) {
        //recover totalPrice
        let totalPriceContainer = document.getElementById("totalPrice")
        let totalPrice = parseInt(totalPriceContainer.innerText)

        //change quantity
        totalPrice -= item.price * item.quantity;
        totalPrice += item.price * event.value;

        //refresh display totalPrice
        let newTotalPriceText = document.createTextNode(totalPrice);
        totalPriceContainer.appendChild(newTotalPriceText);
        totalPriceContainer.removeChild(totalPriceContainer.firstChild);

        //add localStorage item quantity and quantity selected, parseInt > transform string in entire number
        item.quantity = event.value;
        console.log(item.quantity);
        console.log(event.value);
        //assign newQuantity of localStorage product
        sameProduct.quantityValue = event.value;

        //return data in localStorage
        localStorage.setItem("item", JSON.stringify(registeredItem));
    }
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



    
    
