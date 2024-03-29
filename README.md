# Веб-приложение "Чат"

Прототипы нарисованы в Figma: [ссылка на макет](https://www.figma.com/file/Qpll50dWQyTTndVqcu4RoT/Messenger?node-id=0%3A1&t=9wPPl45nOaz20qiK-1)

Render.com (prod): https://messenger-anofrieva.onrender.com/


Команды:
- для запуска проекта в режиме разработки
    ```
    npm run dev
    ```

- для сборки
    ```
    npm run build
    ```
- для запуска локальной раздачи статики через Express
  ```
  npm run start
  ```

- для запуска тестов
  ```
  npm run test
  ```


Стек:
  - TS
  - Handlebars
  - Parcel
  - Express
  - Feature-Sliced Design

Функциональность:

 - Внедрен TS
 - Добавлен компонентный подход, компоненты реализованы на основе Block
 - Реализлван EventBus
 - Сбор данных из форм выводиться в console.log
 - Добавлена валидация на все формы с использованием регулярных выражений.
 - Генерация страниц на стороне клиента, сборка с помощью Parcel
 - Структура проекта соотвествует Feature-Sliced Design
 - Добавлен класс HTTPTransport для работы с запросами
 - Добавлены ESLint, Stylelint
 - В проект добавлен роутинг
 - Внедрен HTTP API чатов, авторизации и пользователей. [Описание API](https://ya-praktikum.tech/api/v2/swagger/#/)

    Добавлено:

    - авторизацию в полном объеме (регистрация, авторизация, выход из системы);
    - работу с информацией пользователя (изменять данные пользователя, изменять аватар, изменять пароль);
    - работу с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата).
- Подключены WebSocket для работы с real-time сообщениями. [Описание API](https://ya-praktikum.tech/api/v2/openapi/ws)

Webpack сборка:
Плагины:
- DeadCodePlugin - выведет предупреждения о неиспользуемых файлах
- CaseSensitivePathsPlugin - при импортировании модуля с неправильным регистром выведет ошибку
- inspectpack - при появлении копий пакета будет выскакивать предупреждение
- TimeAnalyticsPlugin - Аналитика временных затрат загрузчиков и плагинов в webpack.
- MiniCssExtractPlugin - плагин извлекает CSS в отдельные файлы. Он создает файл CSS для каждого файла JS, который содержит CSS.

Для тестов используются: mocha, chai, sinon

На проекте настроен pre-commit с помощью husky и lint-staged.
- tsc запускается для всех файлов, потому что изменения в промежуточных файлах могут повлиять на компиляцию немодифицированных файлов.


