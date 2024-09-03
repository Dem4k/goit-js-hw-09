import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
const form = document.querySelector('.feedback-form');

const { email, message } = form.elements;

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  email.value = formData.email || '';
  message.value = formData.message || '';
}

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Fill please all fields',
      position: 'topCenter',
    });
    return;
  }
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  formData = {};
}
