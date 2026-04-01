
//(1) -- CONFIRM ORDER FUNCTION THAT RUNS WHEN THE BUTTON IS CLICKED
    const ConfirmOrder = document.querySelector('.js-submit-btn');
    ConfirmOrder.addEventListener( 'click', () => {

      const FirstName = document.querySelector('.js-first-name').value;
      const LastName = document.querySelector('.js-last-name').value;
      const Email = document.querySelector('.js-email').value;
      const phone = document.querySelector('.js-phone').value;
      const Address = document.querySelector('.js-address').value;
      const City = document.querySelector('.js-city').value;
      const State = document.querySelector('.js-state').value;
      const ZipCOde = document.querySelector('.js-zip').value;
     

      if( FirstName === '')
      { document.querySelector('.js-display').innerHTML = 'Please fill in your details';}
      else if ( LastName === '')
      { document.querySelector('.js-display1').innerHTML = 'Please fill in your details'; }
      else if ( Email === '')
      { document.querySelector('.js-display2').innerHTML = 'Please fill in your details' }
      else if ( phone === '')
      { document.querySelector('.js-display3').innerHTML = 'Please fill in your details' }
      else if ( Address === '') 
      { document.querySelector('.js-display4').innerHTML = 'Please fill in your details' }
       else if ( City === '')
      { document.querySelector('.js-display5').innerHTML = 'Please fill in your details' }
      else if ( State === '')
      { document.querySelector('.js-display6').innerHTML = 'Please fill in your details' }
      else if ( ZipCOde === '') 
      { document.querySelector('.js-display7').innerHTML = 'Please fill in your details' }
      else { localStorage.setItem('customerDetails', JSON.stringify({
            firstName: FirstName,
            lastName: LastName,
            email: Email,
            phone: phone,
            address: Address,
            city: City,
            state: State,
            zipCode: ZipCOde
        }));

         window.location.href = '../html/confirmation.html';
      }
      
      
      console.log(FirstName,LastName,Email,phone,Address,City,State,ZipCOde);
    });