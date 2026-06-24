// Load orders from localStorage.
// IMPORTANT: Use length check — empty array [] is truthy so || alone won't work as fallback.
const _storedOrders = JSON.parse(localStorage.getItem('orders'));
export const orders = (_storedOrders && _storedOrders.length > 0) ? _storedOrders : [
  {
    id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
    orderTime: '2026-08-12T10:30:00',
    totalCostCents: 3506,
    products: [
      {
        // Black and Gray Athletic Cotton Socks - 6 Pairs
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        estimatedDeliveryTime: '2026-08-15T00:00:00'
      },
      {
        // Adults Plain Cotton T-Shirt - 2 Pack
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 2,
        estimatedDeliveryTime: '2026-08-19T00:00:00'
      }
    ]
  },
  {
    id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
    orderTime: '2026-06-10T14:00:00',
    totalCostCents: 4190,
    products: [
      {
        // Intermediate Size Basketball
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        estimatedDeliveryTime: '2026-06-17T00:00:00'
      }
    ]
  }
];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}