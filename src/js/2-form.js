// 2-form.js

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

// Заполнение  формы  из localStorage при загрузке
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

//  Делегирование input на форме
formEl.addEventListener('input', onFormInput);

function onFormInput(event) {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//  Submit
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  formEl.reset();
}
