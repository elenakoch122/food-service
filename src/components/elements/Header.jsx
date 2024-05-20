import style from './Header.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentUser, setAuth } from '../../store/reducers/auth';
import { removeAllProducts } from '../../store/reducers/products';
import { icons } from '../../icons';
import Button from '../ui/Button';
import BasketButton from '../ui/BasketButton';
import ButtonRound from '../ui/ButtonRound';

export default function Header({ type, title }) {
  const { count, sum } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = () => {
    dispatch(setAuth(false));
    dispatch(removeCurrentUser());
    dispatch(removeAllProducts());
  }

  const [isTextButton, setIsTextButton] = useState(true);
  const mediaQuery = window.matchMedia('(min-width: 881px)');
  const handleView = () => setIsTextButton(mediaQuery.matches);

  useEffect(() => {
    handleView();

    window.addEventListener('resize', handleView);
    return () => window.removeEventListener('resize', handleView);
  }, []);

  return (
    <header className={`${style.header} ${style[type]}`}>
      <div className={style.header__title__wrapper}>
        {type !== 'products' && <ButtonRound
          icon={icons.arrowBack}
          color="#D58C51"
          width="32"
          callback={() => navigate(-1)}
        />}
        
        {title && <h1 className={style.header__title}>{title}</h1>}                
      </div>

      <div className={style.header__actions}>
        <div className={style.order}>
          <p className={style.order__count}>{count}&nbsp;товара</p>
          <p className={style.order__sum}>на сумму {sum.toLocaleString('ru-RU')}&nbsp;₽</p>
        </div>

        <Link to={'/basket'}>
          <BasketButton />
        </Link>

        <Link to={'/'}>
          <Button
            text={isTextButton ? 'Выйти' : icons.exit} 
            backgroundColor='transparent'
            callback={exit}
          />
        </Link>
      </div>
    </header>
  );
}