import style from './Products.module.css';
import Button from '../components/ui/Button';
import HeaderBasket from '../components/blocks/HeaderBasket';
import ProductsList from '../components/blocks/ProductsList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Products() {
  document.title = 'Наша продукция';

  const navigate = useNavigate();
  let isAuthorized = JSON.parse(localStorage.getItem('isAuthorized')) || false;
  let isOrdered = JSON.parse(localStorage.getItem('isOrdered')) || false;

  const goHome = () => navigate('/');

  const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.close();
    localStorage.removeItem('isOrdered');
  };

  useEffect(() => {
    if (!isAuthorized) goHome();

    if (isOrdered) {
      let modal = document.getElementById('modal');
      modal.show();
    }
  }, []);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.header__title}>Наша продукция</h1>
        <HeaderBasket />
      </header>

      <ProductsList />

      <dialog className={style.modal} id="modal">
        <p className={style.modal__text}>Заказ оформлен.</p>
        <Button
          text="ОК"
          backgroundColor="#D58C51"
          callback={closeModal}
        />
      </dialog>
    </div>
  );
}

export default Products;
