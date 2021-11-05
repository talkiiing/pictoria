# pictoria

## Как развернуть

1. Скопировать `.env.sample` в `.env`
2. `docker-compose up`
3. Готово, поднята база данных mariadb, phpmyadmin по адресу
   http://localhost:8080, и сам бэкенд по адресу http://localhost:3000

## Демо

Демонстрационный скрипт находится в корне и называется `DEMO.js`. Для запуска
потребуется установить Node.js 17, npm и выполнить:

```sh
$ npm install
$ node DEMO.js
```

**Обратите внимание**, что по умолчанию запросы отправляются на продакшн
(https://pictoria.s.ix3.space). Чтобы передать локальный хост, надо запускать
скрипт следующим образом:

```sh
$ HOST=http://localhost:3000 node DEMO.js
```

## Документация

### _POST_ `/upload`

_Headers_:

`Content-Type`: `multipart/form-data`

_Body_:

`image`: Your JPEG image file

_Response_:

```jsonc
{
  "id": 5, // ID изображения
  "newlyInserted": false, // флаг, было ли найдено похожее изображение в базе данных
  "updated": true, // флаг, было ли заменено это изображение на отправленное (в случае, если вы отправили изображение лучшего качества, чем то, которое уже было в БД)
  "width": 1920, // ширина
  "height": 1080 // высота
}
```

### _GET_ `/get/ID`

_Params_:

`ID`: The ID that you got from `/upload`

_Response_: `image/jpeg`
