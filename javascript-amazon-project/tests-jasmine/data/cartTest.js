
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {

  it('adds an existing product to the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
        <option value="1" selected>1</option>
      </select>
    `;

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(Storage.prototype, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
        <option value="1" selected>1</option>
      </select>
    `;

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

});
