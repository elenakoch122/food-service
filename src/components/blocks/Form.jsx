import style from './Form.module.css';
import Button from '../ui/Button';
import checkForm from '../../checkForm';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Form({ link, title, button }) {
  let url;
  link === 'Зарегистрироваться' ? url = '/registration' : url = '/';

  const navigate = useNavigate();
  const goProducts = () => navigate('/products');
  let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized')) || false;

  const checkAuthorization = () => {
    if (isAuthorized) goProducts();
  };

  useEffect(() => checkAuthorization(), []);

  const validate = (e) => {
    e.preventDefault();
    isAuthorized = checkForm(e.target);
    checkAuthorization();
  };

  useEffect(() => {
    const checkbox = document.getElementById('check');
    const isAuthForm = document.querySelector('h1').textContent === 'Вход';

    isAuthForm ? checkbox.setAttribute('disabled', '') : checkbox.removeAttribute('disabled');
  });

  return (
    <form className={style.form} noValidate onSubmit={validate}>

      <Link to={url} className={style.form__link}>{link}</Link>

      <h1 className={style.form__title}>{title}</h1>

      <div className={style.form__inputWrapper}>
        <input className={style.form__input} id="login" type="text" name="email" placeholder="Логин" minLength="4" required />
      </div>

      <div className={style.form__inputWrapper}>
        <input className={style.form__input} id="password" type="password" name="password" placeholder="Пароль" minLength="4" required />
      </div>

      <div className={style.form__agree}>
        <input className={style.form__agreeCheck} id="check" type="checkbox" name="agree" />
        <label className={style.form__agreeLabel} htmlFor="check">
          <span className={style.form__agreeText}>Я согласен получать обновления на почту</span>
        </label>
      </div>

      <Button
        text={button}
        backgroundColor="#D58C51"
      />

    </form>
  );
}

export default Form;
