import { icons } from '../../icons';
import style from './BasketCard.module.css';
import ButtonRound from '../ui/ButtonRound';
import { removeProductFromBasket } from '../../store/reducers/products';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BasketCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardInside = () => navigate(`/product/${product.id}`);

  const removeProduct = (e) => {
    e.stopPropagation();
    dispatch(removeProductFromBasket(product.idUnic));
  };

  return (
    <div
      className={style.basket__card}
      onClick={cardInside}
    >
      <img className={style.basket__cardImg} src={product.url} alt={product.imgDescription} />
      <h2 className={style.basket__cardTitle}>{product.title}</h2>
      <div>
        <span className={style.basket__cardPrice}>{product.price.toLocaleString('ru-RU')} ₽</span>
        <ButtonRound
          icon={icons.cancel}
          color="#D58C51"
          width="30"
          callback={removeProduct}
        />
      </div>
    </div>
  );
}

export default BasketCard;
