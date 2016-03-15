var sMart = (function () {
	var privateInventory = [];

	return {
		loadInventory: function () {
			var loader = new XMLHttpRequest();
			loader.addEventListener("load", function () {
				privateInventory = JSON.parse(this.responseText).products;
				console.log("privateInventory",privateInventory);

				var productList = document.getElementById('product');
				var outputString = "";

				for (var i = 0; i < privateInventory.length; i++) {
					var currentProduct = privateInventory[i];

					outputString += `<h4>${currentProduct.name}</h4>`
					outputString += `<h4>${currentProduct.price}</h4>`

				}

				productList.innerHTML = outputString;

			});

			loader.open("GET", "products.json")
			loader.send();
		}
	}
})();

sMart.loadInventory();