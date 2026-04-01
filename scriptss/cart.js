import {products} from './product.js';
import { SelectedProduct } from './selectedProduct.js';

// PRODUCTSDISPLAY IS FOR DISPLAYING THE HTML TO THE WEBPAGE
    let productsDisplay = '';

// (1) - THIS LOOP IS FOR DISPLAYING EACH GRID ITEM TO THE WEBPAGE
    products.forEach( (product) => {
    
    productsDisplay = productsDisplay +
        `<div class="grid-item">
            <div class="productIimage-and-text">
                <img
                    class="image-size"
                    src="${product.image}"
                    alt=""
                />
                <div>${product.name}</div>
            </div>
            <div>Price: $${(product.priceCents / 100) .toFixed(2) }</div>
            <div>
                <span class="option-quantity"> Quantity</span>
                <select class="js-quantity-selector" data-product-id="${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div> 
            
            <div  class="buttons"> <button class="css-addToCartButton js-add-to-cart" data-product-id="${product.id}"> Add to cart </button>
            <button class="css-addToCartButton js-remove-from-cart" data-product-id="${product.id}">Remove</button> </div>
        </div>`;

    });

     document.querySelector('.js-product-grid').innerHTML = productsDisplay;
//ENDS HERE------------------------------------------------------------


/* (3) - EVENT AND LOOP FOR ADDING ITEMS TO A NEW CART CALLED
 SELECTED PRODUCT WHEN ADD-TO-CART BUTTON IS CLICKED
*/
let matchingProduct;


   const buttons = document.querySelectorAll('.js-add-to-cart');
   buttons.forEach( (button) => {

     button.addEventListener('click', () => {
        let existingProduct;
        const productId = button.dataset.productId;
        
        const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
        const quantity = Number(quantitySelector.value);
       
        matchingProducts(productId);
         const price = matchingProduct.priceCents;
         const Id = matchingProduct.id;


         SelectedProduct.forEach( (item) => {
           if (item.id === Id)
           { existingProduct = item; }
         });

         if(existingProduct)
            {existingProduct.quantity += quantity;}
         else{
            SelectedProduct.push({
            price: price,
            id: Id,
            quantity: quantity,  });  };

      updateCartQuantity();
      localStorage.setItem('SelectedProduct', JSON.stringify(SelectedProduct));
    });
       console.log(SelectedProduct);
        });
  
//ENDS HERE -----------------------------------------------------------


/* (2) - FUNCTION FOR GETTING AND MATCHING IDS, THEN 
    SAVING THE FULL OBJECT INTO A VARIABLE */

   function matchingProducts(value) {

        products.forEach( (product) => {
            if(product.id === value )
            { matchingProduct =  product; }
        });
   };
//ENDS HERE -----------------------------------------------------------


// (4) - FUNCTION FOR REMOVING ITEM FROM CART 
   function removeFromCart(value) {
       const index = SelectedProduct.findIndex((item) => item.id === value);
         if(index !== -1) {
       SelectedProduct.splice(index, 1);
     };    
    };
//ENDS HERE -----------------------------------------------------------


  // (5) - EVENT LISTENER FOR REMOVING FROM CART 
    document.querySelectorAll('.js-remove-from-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
            localStorage.setItem('SelectedProduct', JSON.stringify(SelectedProduct));
            updateCartQuantity();
   });
});
//ENDS HERE -----------------------------------------------------------


// (6) - function FOR UPDATING CART QUANTITY IN THE ADD TO CART EVEMT LISTENER
    function updateCartQuantity() {
        let cartQuantity = 0;
        SelectedProduct.forEach((item) => {
            cartQuantity = cartQuantity + item.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        }

 updateCartQuantity(); // runs on page load
//ENDS HERE -----------------------------------------------------------


    

   