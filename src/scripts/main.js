'use strict';

const address
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const request = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status} - not found`)
          );
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = (url) => request(`${url}.json`);

const getPhonesDetails = (url, id) => request(`${url}/${id}.json`);

document.querySelector('body').insertAdjacentHTML(
  'afterbegin',
  `<table style="border: 1px solid black">
    <thead>
      <tr>
        <td>Name</td>
        <td>Display</td>
        <td>Os</td>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`);

const table = document.querySelector('table>tbody');

getPhones(address)
  .then(data =>
    data.map(phone => {
      getPhonesDetails(address, phone.id)
        .then(phonesDetail => {
          table.insertAdjacentHTML('beforeend',
            `<tr>
              <td>${phonesDetail.name}</td>
              <td>${phonesDetail.display.screenResolution}</td>
              <td>${phonesDetail.android.os}</td>
            </tr>`
          );
        });
    }));
