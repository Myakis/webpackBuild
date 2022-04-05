//react
import React from 'react';
import { createRoot } from 'react-dom/client';

//Импорт js файлов
import { Post } from './post';

//Работа со стилями
import './styles/styles.css';
import './styles/sass.scss';

//Работа с json
import json from './assets/data-base.json';

//Работа с изображениями
import webpackLogo from './assets/img/webpack-logo.png';

createRoot;
const post = new Post('Webpack', webpackLogo);

console.log(JSON.parse(post.toString()));
console.log(json);
import { asyncFn } from './post';

asyncFn();

const App = () => (
  <>
    <h1>Webpack</h1>
    <h1>gggfff</h1>
    <div class='logo'></div>
  </>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab='home' />);
