const bodyGallery = (document.querySelector('body').style.backgroundColor =
  'white');

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('#delay'),
  inputState: document.querySelector('#state'),
};

function getPromise(e) {
  e.preventDefault();
  const delay = e.currentTarget.elements.delay.value;
  const state = e.currentTarget.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(() => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: delay,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: delay,
      });
    });
  e.target.reset();
}

refs.form.addEventListener('submit', getPromise);
