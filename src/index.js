//Импорт js файлов
import { Post } from './post';

//Работа со стилями
import './styles/styles.css';

//Работа с json
import json from './assets/data-base.json';

//Работа с изображениями
import webpackLogo from './assets/img/webpack-logo.png';

const post = new Post('Webpack', webpackLogo);

console.log(JSON.parse(post.toString()));
console.log(json);
