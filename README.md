# pictoria

## Демо

Демонстрационный скрипт находится в корне и называется `DEMO.js`. Для запуска потребуется установить Node.js 17, npm и выполнить:

```sh
$ npm install
$ node DEMO.js
```

## Документация

### *POST* `/upload`

*Headers*:

`Content-Type`: `multipart/form-data`

*Body*:

`image`: Your JPEG image file

*Response*: Строка с ID

### *GET* `/get/ID`

*Params*:

`ID`: The ID that you got from `/upload`

*Response*: `image/jpeg`
