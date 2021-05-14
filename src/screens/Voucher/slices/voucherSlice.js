import {createSlice} from '@reduxjs/toolkit';

const initState = {
  voucher: {},
};

const voucherSlice = createSlice({
  name: 'voucher',
  initialState: initState,
  reducers: {
    addVoucher(state, action) {
      const {item} = action.payload;
      state.voucher = {
        ...item,
      };
    },
  },
});

export const {addVoucher} = voucherSlice.actions;

export default voucherSlice.reducer;
