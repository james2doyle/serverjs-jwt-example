document.addEventListener('DOMContentLoaded', () => {
  const pre = document.querySelector('pre');
  const progressBar = document.getElementById('progress');
  const form = document.getElementById('form');

  function makePOST(url, formData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.onload = function () {
      let err = this;
      if (this.status >= 200 && this.status < 400) {
        err = false;
      }

      callback(err, JSON.parse(this.responseText));
    };

    xhr.onerror = function (err) {
      progressBar.textContent = '🔴 error!';
      // There was a connection error of some sort
      callback(this, err);
    };

    // multipart/form-data
    xhr.send(formData);
  }

  function makeGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      let err = this;
      if (this.status >= 200 && this.status < 400) {
        err = false;
      }

      callback(err, JSON.parse(this.responseText));
    };

    xhr.onerror = function (err) {
      // There was a connection error of some sort
      callback(this, err);
    };

    xhr.send();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    progressBar.textContent = '🔵 logging in...';
    makePOST(event.target.action, data, (err, res) => {
      if (err) {
        progressBar.textContent = '🔴 error!';
        pre.innerText = JSON.stringify(res, null, 2);

        return;
      }

      progressBar.textContent = '🔐 logged in';
      pre.innerText = JSON.stringify(res, null, 2);
      makeGET(`/protected?token=${res.token}`, (err, res) => {
        console.log(res);
        pre.innerText += `\n\n${JSON.stringify(res, null, 2)}`;
      });
    });
    return false;
  });
});
