//recover localStorage
//reading localStorage and transform JSON in JS or create new table if it doesn't exist
let registeredItem = JSON.parse(localStorage.getItem("item")) || [];
console.log(registeredItem);

//_____Recover products from API
const recoverProducts = async function () {
    await registeredItem.map(item => {
        fetch(`http://localhost:3000/api/products/${item.idValue}`)
            //transform JSON format
            .then(response => response.json())
            //data
            .then(data => {
                data.price;
                item.name = data.name;
                item.price = data.price;
                item.imageUrl = data.imageUrl;
                item.altTxt = data.altTxt;
                item.description = data.description;
            })
    })
};
recoverProducts();
console.log(registeredItem);
    

//_____Display items
const itemsDisplay = async function () {
    // await displayCart();
    await recoverProducts();
    console.log(registeredItem[0].colorValue);
    document.getElementById("cart__items").innerHTML = registeredItem.map(function(item) {
        return console.log(item["name"]);
    })
};
itemsDisplay();

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
    let emailRegEx = new RegExp(/^([\w!#$%&'*+/=?^`{|}~-]{2}(?:[.]?[\w!#$%&'*+/=?^`{|}~-]){0,60})@([a-z]{2,246}[a-z.-]?)+([.][a-z]{2,3})$/g);
    
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





    
    
