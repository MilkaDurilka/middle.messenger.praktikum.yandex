# Веб-приложение "Чат"

Прототипы нарисованы в Figma: [ссылка на макет](https://www.figma.com/file/Qpll50dWQyTTndVqcu4RoT/Messenger?node-id=0%3A1&t=9wPPl45nOaz20qiK-1)

Netlify (prod): https://monumental-twilight-a5371e.netlify.app/
Netlify Preview 3 sprint: https://deploy-preview-7--monumental-twilight-a5371e.netlify.app/



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

- для запуска фикса Eslint
  ```
  npm run start
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
