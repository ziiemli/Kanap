//recover localStorage
//reading localStorage and transform JSON in JS or create new table if it doesn't exist
let registeredItem = JSON.parse(localStorage.getItem("item")) || []

//_____Cart init
const cartInit = () => {
    //loop through localStorage to recover each informations of item
    Promise.all(
        registeredItem.map(async (item) => {
            const r = await recoverProducts(item)
            return r
        })
    ).then((data) => {
        //call functions with data as parameters
        itemsDisplay(data)
        totalDisplay(data)
    })
}
cartInit()

//_____Recover item informations from API and add infos of localStorage
async function recoverProducts(item) {
    //call data API
    const result = await fetch(`http://localhost:3000/api/products/${item.idValue}`)
    //transform data result in JSON
    const obj = await result.json()
    //add quantityValue and colorValue from localStorage to obj
    obj.quantity = item.quantityValue
    obj.color = item.colorValue
    return obj
}

//_____Items Display
const itemsDisplay = (data) => {
    //loop through data to display each product
    data.forEach((item) => {
        const displayCard = document.getElementById("cart__items")
        //create HTML Product Card
        //_____Article
        const article = document.createElement("article")
        article.classList = "cart__item"
        article.dataset.id = item._id
        article.dataset.color = item.color

        //____Image
        const imageContainer = document.createElement("div")
        imageContainer.classList = "cart__item__img"
        article.appendChild(imageContainer)

        const image = document.createElement("img")
        image.src = item.imageUrl
        image.alt = item.altTxt
        imageContainer.appendChild(image)

        //___informations Container
        const informationsContainer = document.createElement("div")
        informationsContainer.classList = "cart__item__content"
        article.appendChild(informationsContainer)

        //__informations description content
        const descriptionContent = document.createElement("div")
        descriptionContent.classList = "cart__item__content__description"
        informationsContainer.appendChild(descriptionContent)

        //h2
        const descriptionName = document.createElement("h2")
        const descriptionNameText = document.createTextNode(`${item.name}`)
        descriptionName.appendChild(descriptionNameText)
        descriptionContent.appendChild(descriptionName)
        //color
        const descriptionColor = document.createElement("p")
        const descriptionColorText = document.createTextNode(`${item.color}`)
        descriptionColor.appendChild(descriptionColorText)
        descriptionContent.appendChild(descriptionColor)
        //price
        const descriptionPrice = document.createElement("p")
        const descriptionPriceText = document.createTextNode(`${item.price} €`)
        descriptionPrice.appendChild(descriptionPriceText)
        descriptionContent.appendChild(descriptionPrice)

        //__informations settings content
        const settingsContent = document.createElement("div")
        settingsContent.classList = "cart__item__content__settings"
        informationsContainer.appendChild(settingsContent)

        //__quantity
        const settingsQuantity = document.createElement("div")
        settingsQuantity.classList = "cart__item__content__settings__quantity"
        settingsContent.appendChild(settingsQuantity)

        const quantity = document.createElement("p")
        const quantityText = document.createTextNode(`Qté : `)
        quantity.appendChild(quantityText)
        settingsQuantity.appendChild(quantity)

        const inputQuantity = document.createElement("input")
        inputQuantity.type = "number"
        inputQuantity.classList = "itemQuantity"
        inputQuantity.name = "itemQuantity"
        inputQuantity.min = 1
        inputQuantity.max = 100
        inputQuantity.value = item.quantity
        settingsQuantity.appendChild(inputQuantity)

        //delete
        const settingsDelete = document.createElement("div")
        settingsDelete.classList = "cart__item__content__settings__delete"
        settingsContent.appendChild(settingsDelete)

        const Delete = document.createElement("p")
        Delete.classList = "cart__item__content__settings__delete"
        const DeleteText = document.createTextNode("Supprimer")
        DeleteText.classList = "deleteItem"
        Delete.appendChild(DeleteText)
        settingsDelete.appendChild(Delete)

        //Article to display Card
        displayCard.appendChild(article)

        //_____CHANGE QUANTITY_____//
        inputQuantity.addEventListener("change", (event) => {
            changeQuantity(event.target, item)
        })
        //_____Delete Product_____//
        Delete.addEventListener("click", (event) => {
            deleteProduct(event.target, item)
        })
    })
}

//_____display sumPrices and quantity
function totalDisplay(data) {
    //init totalQuantity and totalPrice
    let totalQuantity = 0
    let totalPrice = 0
    //loop through data to calculate totalQuantity and totalPrice
    data.forEach((d) => {
        totalQuantity += parseInt(d.quantity)
        totalPrice += parseInt(d.price) * parseInt(d.quantity)
    })
    //display totalQuantity and totalPrice
    document.getElementById("totalPrice").innerText = totalPrice
    document.getElementById("totalQuantity").innerText = totalQuantity
}

//compare the selected product and the localStorage product
function compareProduct(item) {
    return registeredItem.find((p) => item._id === p.idValue && item.color === p.colorValue)
}

//____Change quantity
function changeQuantity(event, item) {
    let sameProduct = compareProduct(item)
    //if same item in localStorage > modify quantity
    if (sameProduct) {
        //recover totalPrice & quantity
        let totalPriceContainer = document.getElementById("totalPrice")
        let totalPrice = parseInt(totalPriceContainer.innerText)
        let totalQuantityContainer = document.getElementById("totalQuantity")
        let totalQuantity = parseInt(totalQuantityContainer.innerText)

        //change price >  subtract value, add new value
        totalPrice -= item.price * item.quantity
        totalPrice += item.price * event.value
        //change quantity
        totalQuantity -= parseInt(item.quantity)
        totalQuantity += parseInt(event.value)
        // totalQuantity = totalQuantity--;
        console.log(totalQuantity)

        //refresh display totalPrice
        let newTotalPriceText = document.createTextNode(totalPrice)
        totalPriceContainer.appendChild(newTotalPriceText)
        totalPriceContainer.removeChild(totalPriceContainer.firstChild)
        //refresh display quantity
        let newTotalQuantityText = document.createTextNode(totalQuantity)
        totalQuantityContainer.appendChild(newTotalQuantityText)
        totalQuantityContainer.removeChild(totalQuantityContainer.firstChild)

        //assignto item.quantity the new quantity value
        item.quantity = event.value
        //assign newQuantity of localStorage product
        sameProduct.quantityValue = event.value

        //return data in localStorage
        localStorage.setItem("item", JSON.stringify(registeredItem))
    }
}
//____Delete Product
function deleteProduct(event, item) {
    let sameProduct = compareProduct(item)
    //if same item in localStorage > delete Product
    if (sameProduct) {
        //update price & quantity
        let array = {value: 0}
        changeQuantity(array, item)

        //select HTML article
        const selectArticle = event.closest("article")
        //delete HTML article
        selectArticle.remove()

        //find item index
        let index = registeredItem.findIndex((rank) => rank === sameProduct)
        //remove item of localStorage
        registeredItem.splice(index, 1)
        localStorage.setItem("item", JSON.stringify(registeredItem))
    }
}

//_____FORM
//select input Tag
let formInput = document.getElementsByTagName("input")

//select each input
let firstName = formInput.firstName
let lastName = formInput.lastName
let address = formInput.address
let city = formInput.city
let email = formInput.email

//creation RegEx
const firstNameRegEx = /^([A-Za-zÀ-Üà-ü-\s]{2,20})$/g
const lastNameRegEx = /^([A-Za-zÀ-Üà-ü-\s]{2,20})$/g
const addressRegEx = /^([0-9\s]{0,4})+([A-Za-zÀ-Üà-ü-.\s]{2,60})$/g
const cityRegEx = /^([A-Za-zÀ-Üà-ü-.'\s]{2,40})$/g
const emailRegEx = /^([\w!#$%&'*+/=?^`{|}~-]{2}(?:[.]?[\w!#$%&'*+/=?^`{|}~-]){0,60})@([a-z]{2,246}[a-z.-]?)+([.][a-z]{2,3})$/g

//Verify formValues
function checkForm() {
    //True/False Value First Name
    firstName.addEventListener("change", () => {
        let errorFirstName = document.getElementById("firstNameErrorMsg");
        if (!firstName.value.match(firstNameRegEx)) {
            errorFirstName.innerText = "Veuillez renseigner un prénom valide"
        } else {
            errorFirstName.innerText = "";
        }
    })
    //True/False Value Last Name
    lastName.addEventListener("change", () => {
        let errorLastName = document.getElementById("lastNameErrorMsg");
        if (!lastName.value.match(lastNameRegEx)) {
            errorLastName.innerText = "Veuillez renseigner un nom valide"
        } else {
            errorLastName.innerText = ""
        }
    })
    //True/False Value Address Name
    address.addEventListener("change", () => {
        let errorAddress = document.getElementById("addressErrorMsg");
        if (!address.value.match(addressRegEx)) {
            errorAddress.innerText = "Veuillez renseigner une adresse valide"
        } else {
            errorAddress.innerText = "";
        }
    })
    //True/False Value City Name
    city.addEventListener("change", () => {
        let errorCity = document.getElementById("cityErrorMsg");
        if (!city.value.match(cityRegEx)) {
            errorCity.innerText = "Veuillez renseigner une ville valide"
        } else {
            errorCity.innerText = "";
        }
    })
    //True/False Value Email Name
    email.addEventListener("change", () => {
        let errorEmail = document.getElementById("emailErrorMsg");
        if (!email.value.match(emailRegEx)) {
            errorEmail.innerText = "Veuillez renseigner une adresse email valide"
        } else {
            errorEmail.innerText = "";
        }
    })
}
checkForm()

//send order = valid form + ID of products
function sendOrder() {
    const orderBtn = document.getElementById("order");

    orderBtn.addEventListener("click", function (e) {
        e.preventDefault();

        //if localStorage is empty
        if (registeredItem.length === 0){
            alert("Veuillez ajouter des produits au panier");
        }
        else {
            //if form correct
            if (firstName.value.match(firstNameRegEx) && 
                lastName.value.match(lastNameRegEx) &&
                address.value.match(addressRegEx) &&
                city.value.match(cityRegEx) &&
                email.value.match(emailRegEx)) {
                //push id of localStorage to new table
                let orderProducts = [];
                registeredItem.forEach(item => {
                    orderProducts.push(item.idValue);
                });

                //group informations to send
                let formValues = {
                    contact: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value,
                    },
                    products: orderProducts
                }
                console.log(formValues);

                //post request
                fetch(`http://localhost:3000/api/products/order`, {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
                })
                .then(response => response.json())
                .then(data => {
                    //send to order confirmation page
                    window.location.href = "confirmation.html?orderId=" + data.orderId
                })
            }
            //form not correct or empty
            else {
                alert("Veuillez renseigner le formulaire");
            }
        }


        

    })
}
sendOrder()
