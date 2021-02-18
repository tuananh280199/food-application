//import node_modules
import lodashGet from 'lodash/get';

const getErrorMessage = (err) => {
  if (err.response) {
    if (err.response.status === 404) {
      return (
        lodashGet(err, 'response.data.stackTrace.message') ||
        // err.response.statusText
        err.response.data.message
      );
    }
    if (err.response.status === 400) {
      return lodashGet(err, 'response.data.message')
        ? Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message
        : err.response.statusText;
    }
    if (err.response.status === 500) {
      return lodashGet(err, 'response.data.stackTrace.message')
        ? err.response.data.stackTrace.message
        : 'Interval server error';
    }
    return err.response.data.message || 'Error, please try again later';
  }
  return 'Error, please try again later';
};

export {getErrorMessage};
