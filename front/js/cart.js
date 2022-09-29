//recover localStorage
//reading localStorage and transform JSON in JS or create new table if it doesn't exist
let registeredItem = JSON.parse(localStorage.getItem("item")) || [];
console.log(registeredItem);


let items = [];
const recoverArticle = async function () {
  await registeredItem.forEach(item => {
    //inject ID of product
    fetch(`http://localhost:3000/api/products/${item.idValue}`)
    //transform JSON format
    .then(response => response.json())
    //data
    .then(data => {
        items.push(data);
        console.log(items.toString);
      })

 });
} 

for (let index = 0; index < items.count; index++) {
  console.log(items[index]);
  
}

console.log(items.length);
console.log(items);
console.log(typeof registeredItem);

recoverArticle();

// // console.log(items);
// // console.log(items.length);
// async function displayCart() {
//   await registeredItem.foreach (article => {
//     let selectItemID = article.idValue;
//     let selectItemName = article.name; 
//     let selectItemImage = article.imageUrl; 
//   });
// };
// displayCart();


  
    

//_____Display items
const itemsDisplay = async function () {
    await displayCart();
    document.getElementById("cart__items").innerHTML = registeredItem.map(item =>
        `<article class="cart__item" data-id="${item._idValue}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${selectItemImage}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>${item.colorValue}</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
        )
};
itemsDisplay();
