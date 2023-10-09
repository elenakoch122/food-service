const minLoginPasswordLength = 4;
const users = JSON.parse(localStorage.getItem('users')) || [];
let login, password, checkbox, isValid;

export default function checkForm(form) {
  login = document.getElementById('login');
  password = document.getElementById('password');
  checkbox = document.getElementById('check');
  isValid = false;

  [...form.elements].forEach((el) => check(el));

  if (form.checkValidity()) {
    form.querySelector('h1').textContent === 'Вход' ? logIn() : register();
  }

  return isValid;
}

function register() {
  const user = {
    login: login.value,
    password: password.value,
    isAgree: checkbox.checked
  };

  const sameUser = users.find(item => item.login === user.login);

  if (sameUser) {
    sameUser.password = user.password;
    sameUser.isAgree = user.isAgree;
  } else {
    users.push(user);
  }

  isValid = true;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('isAuthorized', JSON.stringify(isValid));
}

function logIn() {
  const currentUser = users.find((user) => user.login === login.value && user.password === password.value);

  if (currentUser) {
    isValid = true;
    localStorage.setItem('isAuthorized', JSON.stringify(isValid));
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

  if (!elem) elem = checkbox;

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
    default:
      return 'Поле не должно быть пустым';
  }
}
