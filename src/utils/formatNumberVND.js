let formatNumber;
import('intl')
  .then(() => import('intl/locale-data/jsonp/vi-VN'))
  .then(() => {
    formatNumber = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price);
    };
  });
export {formatNumber};
