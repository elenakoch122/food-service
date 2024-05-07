const minLoginPasswordLength = 4;
const users = JSON.parse(localStorage.getItem('users')) || [];
let isValid;

export default function checkForm(form, user) {
  isValid = false;

  [...form.elements].forEach((el) => check(el));

  if (form.checkValidity()) {
    form.querySelector('h1').textContent === 'Вход' ? logIn(user) : register(user);
  }

  return isValid;
}

function register(currentUser) {
  const sameUser = users.find(user => user.login === currentUser.login);

  if (sameUser) {
    return addError('impossible register');
  } else {
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  isValid = true;
}

function logIn(currentUser) {
  const sameUser = users.find(user => user.login === currentUser.login && user.password === currentUser.password);

  if (sameUser) {
    isValid = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  } else {
    isValid = false;
    addError('invalid data');
  }
}

function check(elem) {
  if (elem.tagName === 'BUTTON') return;

  if ((elem.type === 'text' || elem.type === 'password') && elem.value === '') {
    return addError('empty', elem);
  }

  if (elem.type === 'text' && elem.value.length < minLoginPasswordLength) {
    return addError('small login', elem);
  }

  if (elem.type === 'password' && elem.value.length < minLoginPasswordLength) {
    return addError('small password', elem);
  }

  deleteError(elem);
}

function addError(errorName, elem = null) {
  const type = elem && elem.tagName === 'INPUT' ? 'input' : 'common';

  if (!elem) elem = document.getElementById('check');

  let error = elem.parentElement.querySelector('.error');

  if (!error) {
    error = document.createElement('p');
    error.className = `error error_${type}`;
    elem.parentElement.append(error);
  }
  error.textContent = errorText(errorName);
}

function deleteError(elem) {
  const error = elem.parentElement.querySelector('.error');
  if (error) error.remove();
}

function errorText(errorType) {
  switch (errorType) {
    case 'invalid data':
      return `Логин или пароль неверен`;
    case 'small login':
      return `Логин должен содержать не менее ${minLoginPasswordLength} символов`;
    case 'small password':
      return `Пароль должен содержать не менее ${minLoginPasswordLength} символов`;
    case 'impossible register':
      return `Такой пользователь уже зарегистрирован.`;
    default:
      return 'Поле не должно быть пустым';
  }
}