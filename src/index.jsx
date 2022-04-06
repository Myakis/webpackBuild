//react
import React from 'react';
import { createRoot } from 'react-dom/client';

//Работа со стилями
import './styles/styles.css';
import './styles/sass.scss';

const App = () => (
  <>
    <h1>Webpack</h1>
  </>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab='home' />);
