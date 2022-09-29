let products = [];
//_____Recover products from API
const recoverProducts = async function () {
    await fetch("http://localhost:3000/api/products")
        //transform JSON format
        .then(response => response.json())
        //data
        .then(data => {
            products = data;
            console.log(products);
        })
};

//_____Display all products
const productsDisplay = async function () {
    await recoverProducts();
    //add informations of products
    document.getElementById("items").innerHTML = products.map(product =>
        `<a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>`)
    //delete "," between products
    .join("");
};
productsDisplay();
 
