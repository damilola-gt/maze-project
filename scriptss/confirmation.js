   import { SelectedProduct } from "./selectedProduct.js";
   import { products } from "./product.js";
   
   let display = '';
   let ordernumber = 1000;





   function displayConfirmed() {

      const customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
      const orderTotal = localStorage.getItem('orderTotal');

      ordernumber = ordernumber + 1;

      let itemsList = '';

      SelectedProduct.forEach( (Products) => {
         products.forEach((product) => {
              if(product.id === Products.id )
            { itemsList = itemsList + `${product.name} x${Products.quantity}, `}
         });
       
      });
    
      display = `<div class="confirmation-box">
      
      <div class="thank-you">
         <h1>🎉 Thank you for your order!</h1>
         <p>Your order has been placed successfully.</p>
      </div>

      <div class="order-details">
         
      <div class="detail-row">
         <span class="detail-label">Order Number:</span>
         <span class="detail-value">${ordernumber}</span>
      </div>

      <div class="detail-row">
         <span class="detail-label">Name:</span>
         <span class="detail-value">${customerDetails.firstName + customerDetails.lastName}</span>
      </div>

      <div class="detail-row">
         <span class="detail-label">Email:</span>
         <span class="detail-value">${customerDetails.email}</span>
      </div>

      <div class="detail-row">
         <span class="detail-label">Phone:</span>
            <span class="detail-value">${customerDetails.phone}</span>
      </div>

      <div class="detail-row">
         <span class="detail-label">Address:</span>
         <span class="detail-value">${customerDetails.address}</span>
      </div>

      <hr />

      <div class="detail-row">
         <span class="detail-label">Items Ordered:</span>
         <span class="detail-value">${itemsList}</span>
      </div>

      <div class="detail-row">
         <span class="detail-label">Order Total:</span>
         <span class="detail-value">$${orderTotal}</span>
      </div>

      </div>

      <a href="../html/index.html" class="continue-btn js-continue-btn">Continue Shopping →</a>

      </div>`;
 
    document.querySelector('.js-confirmation-display').innerHTML = display;

    document.querySelector('.js-continue-btn').addEventListener('click', () => {
    localStorage.removeItem('SelectedProduct');
    localStorage.removeItem('orderTotal');
    localStorage.removeItem('customerItems');
    localStorage.removeItem('customerDetails');
   });
   };  
   

   displayConfirmed();

   