/* eslint no-undef: 'off' */;
import 'whatwg-fetch';

export const getJSON = (url, data, callback) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.status < 400) {
      res.json(ret => {
        callback(null, ret);
      });
    }

    callback({ code: res.status, message: res.statusText });
  }, (err) => {
    callback(err);
  });
};
