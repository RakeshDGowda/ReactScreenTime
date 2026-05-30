const cartReducer = (cart: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cart];
      const { product, quantity } = action.payload;
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id,
      );

      if (productIndex === -1) {
        updatedCart.push({ product: product, quantity: quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }
      return updatedCart;
    case "CLEAR_CART":
      return [];

    case "GET_CART":
      return action.payload.products;

    case "REVERT_CART":
      return action.payload.cart;

    case "REMOVE_FROM_CART":
      const oldCart = [...cart];
      const id = action.payload.id;
      const newCart = oldCart.filter((item) => item.product._id !== id);
      return newCart;

    default:
      return cart;
  }
};

export default cartReducer;
