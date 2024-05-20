import style from './Products.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/elements/Header';
import ProductsList from '../components/blocks/ProductsList';
import Button from '../components/ui/Button';

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
      <Header type="products" title="Наша продукция" />
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
