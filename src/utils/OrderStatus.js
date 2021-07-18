export const OrderStatus = {
  pending: 'Chờ Xác Nhận',
  confirm: 'Xác Nhận Đơn Hàng',
  delivery: 'Đang Giao Hàng',
  done: 'Đã Giao',
  cancel: 'Huỷ Đơn Hàng',
};

export const changeDescriptionToStatus = (description) => {
  switch (description) {
    case 'Xác nhận đơn hàng':
      return OrderStatus.confirm;
    case 'Tài xế đang giao hàng đến cho bạn':
      return OrderStatus.delivery;
    case 'Đơn hàng của bạn đã được giao':
      return OrderStatus.done;
    case 'Đơn hàng của bạn đã bị huỷ':
      return OrderStatus.cancel;
  }
};
