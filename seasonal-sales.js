"use strict";

var storeSmart = [];



function executeThisIfXHRFails(xhrEvent) {
  console.log("An error occured while transferring the data");
}

function productsRetriever() {

  var productData = JSON.parse(this.responseText);
   categoriesRetriever(productData)

  function categoriesRetriever() {

    var categoriesRequest = new XMLHttpRequest;

    categoriesRequest.open("GET", "categories.json")
    categoriesRequest.send();

    categoriesRequest.addEventListener("load", categoriesParse);
    categoriesRequest.addEventListener("error", executeThisIfXHRFails);

   };

   function categoriesParse(){
    var categoryData = JSON.parse(this.responseText).categories;

    storeSmart = productData.products;

    storeSmart.forEach (function(product) {
       let currentCategory = product.category_id;
       categoryData.forEach (function (category) {
        if (currentCategory === category.id) {
          product["department"]=category["name"];
          product["season_discount"]=category["season_discount"];
          product["discount"]=category["discount"];
        };
       })

    })
    makeStore(storeSmart);
   };




var shopDisplay = document.getElementById("shopSmart");
function makeStore (storeSmart) {
storeSmart.forEach( function (currentProduct){
   var shopStuff = "";
  var shopList = storeSmart[currentProduct]
    shopStuff += "<div id='department"+currentProduct.id+"'>Department:";
    shopStuff += `<h3>${currentProduct.department}`;
    shopStuff += "</div>";
    shopStuff += "<div id='product"+currentProduct.id+"'>Product:";
    shopStuff += `<h4>${currentProduct.name}</h4>`;
    shopStuff += "</div>";
    shopStuff += "<div id='price"+currentProduct.id+"'>Price:";
    shopStuff += `<h4>${currentProduct.price}</h4>`;
    shopStuff += "</div>";

    shopDisplay.innerHTML += shopStuff;
}) 

var discountButton = document.getElementById("button");
var dropdown = document.getElementById("seasonSelect");



function makeItCheap (event) {
  storeSmart.forEach (function (storeSmart) {
    if (dropdown.value === storeSmart.season_discount) {
      var newPrice = storeSmart.price - (storeSmart.price * storeSmart.discount);
      newPrice=Math.round(newPrice/0.01);
      newPrice=newPrice/100;
    let currentPrice = document.getElementById("price"+ storeSmart.id);
    currentPrice.innerHTML = "Price: <h4>"+newPrice+ "</h4>";
    }

    }
  
    
    )

  };


discountButton.addEventListener("click", makeItCheap);



};

 };


var productsRequest = new XMLHttpRequest();
  productsRequest.addEventListener("load", productsRetriever);
  productsRequest.addEventListener("error", executeThisIfXHRFails);

  productsRequest.open("GET", "products.json");
  productsRequest.send();



