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
   
};
articleDisplay();

