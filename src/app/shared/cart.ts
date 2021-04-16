export class Cart {

  static items: { product: any; quantity: number; };

  static addToCart(product: any) {
    let local_storage;
    let itemsInCart = []
    this.items = {
      product: product,
      quantity: 1,
    }
    if (localStorage.getItem('cart') == null) {
      local_storage = [];
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      localStorage.setItem('cart_id', new Date().getTime().toString());
    }
    else {
      local_storage = JSON.parse(localStorage.getItem('cart'));

      if(local_storage.length == 0) {
        localStorage.setItem('cart_id', new Date().getTime().toString());
      }

      for (var i in local_storage) {
        if (this.items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          this.items = null;
          break;
        }
      }
      if (this.items) {
        itemsInCart.push(this.items);
      }
      local_storage.forEach(function (item) {
        itemsInCart.push(item);
      })
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }
  }

  static getCartItems() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  static removeCartItem(item: any) {
    let shopping_cart;
    let index;

    shopping_cart = JSON.parse(localStorage.getItem('cart'));

    for (let i in shopping_cart) {
      if (item.product.product_name == shopping_cart[i].product.product_name) {
        index = i;
      }
    }
    shopping_cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));

    if(shopping_cart.length == 0) {
      localStorage.removeItem('cart_id');
    }
    this.getCartItems();
  }

  static getCartTotal() {
    let total = 0;

    Cart.getCartItems().forEach(element => {
      total += (element.product.price * element.quantity);
    });

    return total;
  }

  static getCartId() {
    return Number(localStorage.getItem('cart_id'));
  }
}