import {createSlice} from '@reduxjs/toolkit';

const initState = {
  cartFood: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState,
  reducers: {
    addItemToCart(state, action) {
      const {product, quantity} = action.payload;
      const itemInCart = {
        product,
        quantity,
      };
      state.cartFood.push(itemInCart);
    },
    deleteItemToCart(state, action) {
      const {product_id} = action.payload;
      state.cartFood = state.cartFood.filter(
        (item) => item.product.id !== product_id,
      );
    },
    incrementQuantity(state, action) {
      const {list} = action.payload;
      state.cartFood = list;
    },
    decrementQuantity(state, action) {
      const {list} = action.payload;
      state.cartFood = list;
    },
  },
});

export const {
  addItemToCart,
  deleteItemToCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
