import './assets/fonts/fonts.css'
import './reset.css';
import './base.css';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  document.title = 'Вход/регистрация';
  return (
    <main className="main">
      <Outlet />
    </main>
  );
}

export default App;
