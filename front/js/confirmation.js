//return the URL of the current page
let querystring = new URL (window.location.href);
//return id of the URL
let orderID = querystring.searchParams.get("orderId");

//insert in HTML
let selectOrderId = document.getElementById("orderId");
selectOrderId.innerText = orderID;

//clear cart & localStorage
localStorage.clear();