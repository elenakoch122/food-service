import { icons } from '../../icons';
import style from './Card.module.css';
import ButtonRound from '../ui/ButtonRound';
import uuid from 'react-uuid';
import { addProductInBasket } from '../../store/reducers/products';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Card({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardInside = () => navigate(`/product/${product.id}`);

  const addProduct = (e) => {
    e.stopPropagation();

    const item = Object.assign({
      idUnic: uuid(),
    }, product);

    dispatch(addProductInBasket(item));
  };

  return (
    <div
      className={style.card}
      onClick={cardInside}
    >
      <div className={style.card__main}>
        <img className={style.card__img} src={product.url} alt={product.imgDescription} />
        <h2 className={style.card__title}>{product.title}</h2>
        <p className={style.card__description}>{product.description}</p>
      </div>

      <div className={style.card__footer}>
        <div>
          <span className={style.card__footerPrice}>{product.price.toLocaleString('ru-RU')} ₽ </span>
          <span className={style.card__footerWeight}>/ {product.weight}</span>
        </div>
        <ButtonRound
          icon={icons.add}
          color="#fff"
          width="31"
          callback={addProduct}
        />
      </div>
    </div>
  );
}

export default Card;
