# pictoria

## Кратко

_Стек_: node 17, js, mysql (mariadb), sequelize, docker, docker-compose

Выполнен деплой на сервер AWS Lightsail: https://pictoria.s.ix3.space,
сконфигурированным с помощью nginx.

## Как развернуть локально

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

## Демонстрация с чистой базой данных

```sh
> node DEMO.js
Trying to upload the smallest asset ...
{ newlyInserted: true, id: 1, width: 221, height: 166 }
Trying to get the smallest asset ...
Got image with dimensions 221x166
------------------
Trying to upload bigger asset ...
{ newlyInserted: false, updated: true, id: 1, width: 886, height: 664 }
Trying to get bigger asset ...
Got image with dimensions 886x664
------------------
Trying to upload the biggest and squashed asset ...
{ newlyInserted: true, id: 2, width: 1850, height: 874 }
Trying to get the biggest and squashed asset ...
Got image with dimensions 1850x874
------------------
Trying to upload the smallest asset again ...
{
  newlyInserted: false,
  updated: false,
  id: 1,
  width: 886,
  height: 664
}
Trying to get the smallest asset again ...
Got image with dimensions 886x664
```

1. Загружаем самое маленькое изображение из имеющихся
2. Получаем в ответ его id, и информацию о том, что похожих изображений в БД не
   было `newlyInserted: true`
3. Запрашиваем изображение с этим id
4. Получаем в ответ изображение с нужными размерностями

5. Загружаем то же самое изображение, но побольше
6. Получаем в ответ тот же самый id, информацию о том, что было найдено похожее
   изображение (`newlyInserted: true`), о том, что изображение было заменено
   (`updated: true`) и новые размерности
7. Запрашиваем изображение с этим id
8. Получаем в ответ изображение с нужными размерностями

9. Загружаем то же самое изображение, но еще больше и растянутое вдоль оси X
10. Получаем в ответ новый id (так как оно не пропорциональное), информацию о
    том, что похожих изображений в БД не было `newlyInserted: true`
11. Запрашиваем изображение с этим id
12. Получаем в ответ изображение с нужными размерностями

13. Снова загружаем самое маленькое изображение
14. Получаем в ответ id уже существующего, информацию о том, что нашлось похожее
    изображение, и о том, что оно не было обновлено, и ширину с высотой больше
    чем те, что мы загрузили сейчас
15. Запрашиваем изображение с этим id
16. Получаем в ответ большое изображение

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
