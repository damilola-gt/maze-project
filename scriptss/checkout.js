import { products } from "./product.js";
import { SelectedProduct } from "./selectedProduct.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


// VARIABLES FOR CORRRECT DELIVERY DAYS AND DATES
    const today = dayjs();
     const add7Days = today.add(7, 'days');
     const DeliveryDay7 = add7Days.format('dddd, MMMM D');
     const add3Days = today.add(3, 'days');
     const DeliveryDay3 = add3Days.format('dddd, MMMM D');
     const add1Day = today.add(1, 'day');
     const DeliveryDay1 = add1Day.format('dddd, MMMM D');
// -- ENDS HERE------------------------------------------- 





// (1) -- FOR EACH LOOP THAT LOOPS EVERY ITEM IN SELECTED PRODUCT TO THE PAGE
let DeliveryPrices = {};
let totalShipping = 0;

 function renderCheckout() {
     let checkOutDisplay = '';

     if (SelectedProduct.length === 0) 
     {checkOutDisplay = `<h1 class="Nothing-here-text"> There's nothing here <h2>`}
     else {
    SelectedProduct.forEach((cartItem) => {
        let matchingID;

        products.forEach( (product) => {
        if (cartItem.id === product.id)
        { matchingID = product;  }
        });

        checkOutDisplay += 
        `<div class="selected-items">
            <h3 class="delivery-day" data-delivery-id="${cartItem.id}">Delivery date: Pick a delivery date</h3>

            <div class="items-div">
                <div class="image-div">
                    <img
                        class="selected-checkout-image"
                        src="${matchingID.image}"
                        alt=""
                    />
                </div>

                <div class="texts">
                    <span class="product-name">${matchingID.name}</span>
                    <span>$${(Math.round(matchingID.priceCents) / 100).toFixed(2) }</span>
                    <span>Quantity: ${cartItem.quantity}
                     <button class="Update-links "> Update </button> 
                      <button class="Update-links js-delete-btn" data-product-id="${cartItem.id}"> Delete </button>
                    </span>
                </div>

                <div>
                    <p class="delivery-option-paragraph">
                    Choose a delivery option</p>
                    <div class="Delivery-box">
                        <div class="delivery-full-div">
                            <input type="radio" name="date-${cartItem.id}"  
                            data-delivery-id="${cartItem.id}"
                            data-delivery-date="${DeliveryDay7}" 
                            data-delivery-price="0"/>

                            <div class="delivery-div">
                                <span class="delivery-option-paragraph">${DeliveryDay7}</span>
                                <span class="delivery-option-paragraph">Free Delivery</span>
                        </div>
                    </div>

                    <div class="delivery-full-div">
                        <input type="radio" name="date-${cartItem.id}"  
                            data-delivery-id="${cartItem.id}"
                            data-delivery-date="${DeliveryDay3}"
                            data-delivery-price="4.99" />

                        <div class="delivery-div">
                            <span class="delivery-option-paragraph">${DeliveryDay3}</span >
                            <span class="delivery-option-paragraph">$4.99</span>
                        </div>
                    </div>

                    <div class="delivery-full-div">
                        <input type="radio" name="date-${cartItem.id}" 
                         data-delivery-id="${cartItem.id}" 
                         data-delivery-date="${DeliveryDay1}" 
                         data-delivery-price="9.99"/>

                        <div class="delivery-div">
                            <span class="delivery-option-paragraph">${DeliveryDay1}</span>
                            <span class="delivery-option-paragraph">$9.99</span>
                        </div>
                    </div>

                </div>
              </div>
            </div>
        </div>`;
 
   })};
   document.querySelector('.js-display').innerHTML = checkOutDisplay;

//(2) --- EVENT LISTENER FOR UPDATING DELIVERY DAY TEXT

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('click', () => {
        const deliveryId = radio.dataset.deliveryId;
        const deliveryDate = radio.dataset.deliveryDate;
        const deliveryPrice = radio.dataset.deliveryPrice;
        const number = Number(deliveryPrice);
        DeliveryPrices[deliveryId] = number;
       
        totalShipping = 0;
            Object.values(DeliveryPrices).forEach((price) => {
                totalShipping = totalShipping + price;
            });


        document.querySelector(`.delivery-day[data-delivery-id="${deliveryId}"]`).innerHTML = 
            `Delivery date: ${deliveryDate}`;
             updateOrderSummary();
          console.log(totalShipping);
    });
});


 // (4) --- EVENT LISTENER FOR DELETE BUTTON (reattached after every render)
    document.querySelectorAll('.js-delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        deleteFromCart(productId);
        renderCheckout(); // rerenders the page
        updateOrderSummary(); // recalculates totals
        updateCheckoutCount();
    });
});


 };  


// THE LOOP ENDS HERE ---------------------------------------





//(4) --- THE FUNCTION THAT SHOWS THE UPDATED CART QUANTITY
function updateCheckoutCount() {
    let cartQuantity = 0;
    SelectedProduct.forEach((item) => {
        cartQuantity = cartQuantity + item.quantity;
    });
    document.querySelector('.js-cart-item-count').innerHTML = cartQuantity;
}




// (5) --- FUNCTION FOR DELETING ITEMS FROM CART

function deleteFromCart(value) {
    let index = -1;

    SelectedProduct.forEach((item, position) => {
        if (item.id === value) {
            index = position;
        }
    });

    if (index !== -1) {
        SelectedProduct.splice(index, 1);
    }

    localStorage.setItem('SelectedProduct', JSON.stringify(SelectedProduct));
};
// ENDS HERE -----------------------------------




// (6) -- ORDER SUMMARY PART-------------------------------------
  
    function updateOrderSummary() {
       let productTotal = 0;
        let orderSummary = '';

        SelectedProduct.forEach((summary) => {
            productTotal = productTotal + summary.price * summary.quantity ;
              });

                const productTotalDollars = Math.round(productTotal) / 100;
                const totalBeforeTax = productTotalDollars + totalShipping;
            
                const tax = totalBeforeTax * 0.10;
                const orderTotal = totalBeforeTax + tax;

  
            if (SelectedProduct.length === 0)
            {orderSummary = `<h1 class="Nothing-here-text"> There's nothing here </h2>`;}
            else {
          orderSummary = 
          ` <div class="order-section">
            <p>Order summary</p>
            <div class="order-grid">
              <div class="left-side">
                <span class="left js-left">items(3):</span>
                <span class="left"> shipping & handling: </span>
                <span class="left"> Total before tax:</span>
                <span class="left"> Estimated tax(10%): </span>
              </div>
              <div class="right-side">
                <span class="right">$${(Math.round(productTotal) / 100).toFixed(2) }</span>
                <span class="right">$${totalShipping.toFixed(2) }</span>
                <span class="right"> $${totalBeforeTax.toFixed(2)}</span>
                <span class="right">${tax.toFixed(2)}</span>
              </div>
            </div>
            <hr />

            <div>
              <span class="left">Order Total:</span>
              <span class="right-lane"> ${orderTotal.toFixed(2)}</span>
            </div>

            <div class="button-div">
              <button class="place-order js-place-order" >Place order</button>
            </div>
        </div>`;};

        document.querySelector('.js-order-summary').innerHTML = orderSummary;

        const PlaceOrder = document.querySelector('.js-place-order');
        PlaceOrder.addEventListener( 'click', () => {

             localStorage.setItem('orderTotal', orderTotal);
            localStorage.setItem('customerItems', JSON.stringify(SelectedProduct));

             window.location.href = '../html/order.html';
        });

        updateOrderCount();
        console.log(productTotal);
            
    };

    
    
 
 // (5) --- THE FUNCTION THAT SHOWS THE UPDATED CHECKOUT QUANTITY
 function updateOrderCount() {
    let cartQuantity = 0;
    SelectedProduct.forEach((item) => {
        cartQuantity = cartQuantity + item.quantity;
    });
    document.querySelector('.js-left').innerHTML= `items(${cartQuantity})`;
}

 
renderCheckout();
updateOrderSummary();
updateCheckoutCount();