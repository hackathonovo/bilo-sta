/* eslint no-undef: 'off' */;
import 'whatwg-fetch';

export const postJSON = (url, data, callback) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.status < 400) {
      res.json().then(ret => {
        callback(null, ret);
      });

      return;
    }

    callback({ code: res.status, message: res.statusText });
  }, (err) => {
    callback(err);
  });
};

export const getJSON = (url, callback) => {
  fetch(url, { method: 'get' })
    .then(res => {
      if (res.status < 400) {
        res.json().then(ret => {
          callback(null, ret);
        });

        return;
      }

      callback({ code: res.status, message: res.statusText });
    }, err => {
      callback(err);
    });
};
