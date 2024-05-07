import style from './Form.module.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUser } from '../../store/reducers/auth';
import Button from '../ui/Button';
import checkForm from '../../checkForm';

export default function Form({ link, title, button }) {
  const { currentUser, isAuthorized } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = link === 'Зарегистрироваться' ? '/registration' : '/';

  useEffect(() => {
    const checkbox = document.getElementById('check');
    title === 'Вход' ? checkbox.setAttribute('disabled', '') : checkbox.removeAttribute('disabled');
  }, [title]);

  const onChangeInput = (e) => {
    const { name } = e.target;    
    name === 'isAgree' ? (
      dispatch(setUser({ name, value: e.target.checked }))
    ) : (
      dispatch(setUser({ name, value: e.target.value }))
    );
  };

  const goProducts = () => navigate('/');

  const checkAuthorization = () => {
    if (isAuthorized) goProducts();
  };

  const validate = (e) => {
    e.preventDefault();
    dispatch(setAuth(checkForm(e.target, currentUser)));
    checkAuthorization();
  };  

  return (
    <div className={style.entry}>
      <form className={style.form} noValidate onSubmit={validate}>
        <Link to={url} className={style.form__link}>{link}</Link>
        <h1 className={style.form__title}>{title}</h1>

        <div className={style.form__inputWrapper}>
          <input
            className={style.form__input}
            id="login"
            type="text"
            name="login"
            placeholder="Логин"
            minLength="4"
            value={currentUser.login}
            onChange={onChangeInput}
            required
          />
        </div>

        <div className={style.form__inputWrapper}>
          <input
            className={style.form__input}
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="4"
            value={currentUser.password}
            onChange={onChangeInput}
            required
          />
        </div>

        <div className={style.form__agree}>
          <input
            className={style.form__agreeCheck}
            id="check"
            type="checkbox"
            name="isAgree"
            checked={currentUser.isAgree}
            onChange={onChangeInput}
          />

          <label className={style.form__agreeLabel} htmlFor="check">
            <span className={style.form__agreeText}>Я согласен получать обновления на почту</span>
          </label>
        </div>

        <Button
          text={button}
          backgroundColor="#D58C51"
        />
      </form>
    </div>
  );
}