//_____INDEX_____//

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
        .catch( () => {
            alert("Une erreur est survenue, veuillez réessayer ultérieurement.")
        })
};

//_____Display all products
const productsDisplay = async function () {
    await recoverProducts();
    //add informations of products
    products.forEach(product => {
        const displayProducts = document.getElementById("items");

        //a
        const a = document.createElement("a");
        a.href = `./product.html?id=${product._id}`;
        //article
        const article = document.createElement("article");
        a.appendChild(article);
        //img
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        article.appendChild(img);
        //h3
        const h3 = document.createElement("h3");
        h3.classList = "productName";
        const h3Text = document.createTextNode(`${product.name}`);
        h3.appendChild(h3Text);
        article.appendChild(h3);
        //description
        const description = document.createElement("p");
        description.classList = "productDescription";
        const descriptionText = document.createTextNode(`${product.description}`);
        description.appendChild(descriptionText);
        article.appendChild(description);

        //Article to display Card
        displayProducts.appendChild(a);

    })
};
productsDisplay();
 
