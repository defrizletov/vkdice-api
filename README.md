<p align="center"><img src="https://raw.githubusercontent.com/defrizletov/vkdice-api/main/docs/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/vkdice-api"><img src="https://img.shields.io/npm/v/vkdice-api.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vkdice-api"><img src="https://img.shields.io/npm/dt/vkdice-api.svg?style=flat-square" alt="NPM downloads"></a>
</p>

<div align="center">

**Модуль** для удобного использования **[VKDice API](https://vk.com/@vkdice-api-v2)**.
  
От **[AdepT-Hub](https://adept-hub.ru)** с  ❤.

</div>

## 📦 Установка

```sh
npm i vkdice-api
```

<br/>

## 🚀 Использование

```js
const { VKDice, VKDiceCallback } = require('vkdice-api');

// key - ваш ключ авторизации, полученный в приложении.
// merchant - ID создателя ключа авторизации.
const vkDice = new VKDice({ key: process.env.KEY, merchant: process.env.MERCHANT });

// Запрос для примера, получение баланса пользователя с ID 1.
// Потом вывод ответа или ошибки в консоль.
vkDice.api.coins.balance({ user: 1 }).then(console.log).catch(console.error);

// Подключение callback.

// Создаем сервер с помощью переменной vkDice.
const vkDiceCallback = new VKDiceCallback(vkDice);

// Устанавливаем обработчик, который выполнится, когда придёт пополнение.
// Эта функция выведет объект события в консоль.
vkDiceCallback.on(event => console.log(event));

// Запуск сервера на порт 3000 и хост localhost (эти аргументы стоят по умолчанию).
// Потом, если все успешно, пишем в консоль, что сервер запустился, в противном случае выводим ошибку в консоль.
vkDiceCallback.start(3000, 'localhost').then(console.log('VKDice Callback has been started.')).catch(console.error);
```
