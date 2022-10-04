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
    products.forEach(product => {
        const displayProducts = document.getElementById("items");

        //a
        let a = document.createElement("a");
        a.href = `./product.html?id=${product._id}`;
        //article
        let article = document.createElement("article");
        a.appendChild(article);
        //img
        let img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        article.appendChild(img);
        //h3
        let h3 = document.createElement("h3");
        h3.classList = "productName";
        let h3Text = document.createTextNode(`${product.name}`);
        h3.appendChild(h3Text);
        article.appendChild(h3);
        //description
        let description = document.createElement("p");
        description.classList = "productDescription";
        let descriptionText = document.createTextNode(`${product.description}`);
        description.appendChild(descriptionText);
        article.appendChild(description);

        //Article to display Card
        displayProducts.appendChild(a);

    })
};
productsDisplay();
 
