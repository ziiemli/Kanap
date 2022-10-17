//_____CONFIRMATION_____//

//return the URL of the current page
const querystring = new URL (window.location.href);
//return id of the URL
const orderID = querystring.searchParams.get("orderId");

//insert in HTML
const selectOrderId = document.getElementById("orderId");
selectOrderId.innerText = orderID;

