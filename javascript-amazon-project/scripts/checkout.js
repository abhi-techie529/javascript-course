import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts,loadProductsFetch} from '../data/products.js';
import { loadCart,laodCartFetch } from "../data/cart.js";
// import '../data/backend-practice.js';



async function loadPage() {
   
     try{

        // throw 'error1';


        await Promise.all([
            loadProductsFetch(),
            laodCartFetch()
        ]);
         

    } catch (error){
        console.log('Unexpected error. please try again later.');
    }
   

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

  
}
loadPage()


//****************** Promise.all :- it is used to run multiple promises at the same time*******//

/*
Promise.all([
   loadProductsFetch(),
    new Promise((resolve) => {
            loadCart(() => {
                resolve();
        });
    })

]).then((value) => {
        console.log(value);
        
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
});

*/
//**************** Promise Feature *****************//

/*
    new Promise((resolve) => {
        loadProducts(() => {         
            resolve('abhi');
        });

    }).then((value) => {    
        console.log(value);
        
        
        return new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });

    }).then(() => {     
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();      
    })
*/

 /*   
    loadProducts(() => {
        loadCart(() => {
             renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
       
    })
  */ 