import './App.css'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Products from './pages/Products';
import Form from './components/blocks/Form';

export default function  App() {
  const { isAuthorized } = useSelector(state => state.auth);
  const [content, setContent] = useState(null);

  document.title = isAuthorized ? 'Наша продукция' : 'Вход/регистрация';

  useEffect(() => {
    isAuthorized ? setContent(<Products />) : setContent(<Form link="Зарегистрироваться" title="Вход" button="Войти" />);
  }, [isAuthorized]);

  return content;
}