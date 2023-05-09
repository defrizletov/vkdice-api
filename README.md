<h1 align="center">VKDice-API</h1>

<div align="center">

Модуль для удобного использования VKDice API.

</div>

## 📦 Установка

```sh
npm i vkdice-api
```

<br/>

## 🚀 Использование

```js
const { VKDice, VKDiceCallback } = require('vkdice-api');

const vkDice = new VKDice({ key: 'ТОКЕН', merchant: /* МЕРЧАНТ */ }), vkDiceCallback = new VKDiceCallback(vkDice);

vkDice.api.coins.balance({ user: 1 }).then(console.log).catch(console.error);

vkDiceCallback.on(event => console.log(event));

vkDiceCallback.start(3000, 'localhost').then(console.log('VKDice Callback has been started.')).catch(console.error);
```

## ⚙ Разработчик

<div align="center">
  [AdepT-Hub](https://adept-hub.ru)
</div>
