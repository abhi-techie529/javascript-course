import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // 🔴 FIX 1: Guard — if order or product is not found, show error and stop
  if (!order || !product) {
    document.querySelector('.js-order-tracking').innerHTML = `
      <div style="padding: 40px; text-align: center; color: #721c24;">
        <h2>Could not load tracking info.</h2>
        <p>Order or product not found. Please go back to
          <a href="orders.html">Your Orders</a>.
        </p>
      </div>
    `;
    return;
  }

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  // 🔴 FIX 2: Guard — if productDetails not matched inside order, show error and stop
  if (!productDetails) {
    document.querySelector('.js-order-tracking').innerHTML = `
      <div style="padding: 40px; text-align: center; color: #721c24;">
        <h2>Product not found in this order.</h2>
        <p><a href="orders.html">Go back to Your Orders</a></p>
      </div>
    `;
    return;
  }

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

  // 🟡 FIX 3: Clamp percentProgress between 0 and 100 so the bar never overflows
  const rawProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  const percentProgress = Math.min(100, Math.max(0, rawProgress));


  // Extra feature: display "delivered" on the tracking page
  // if today's date is past the delivery date.
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
       ${deliveredMessage} ${
        deliveryTime.format('dddd, MMMM D')
      }
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();