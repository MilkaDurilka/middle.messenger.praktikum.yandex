# Веб-приложение "Чат"

Прототипы нарисованы в Figma: [ссылка на макет](https://www.figma.com/file/Qpll50dWQyTTndVqcu4RoT/Messenger?node-id=0%3A1&t=9wPPl45nOaz20qiK-1)

Netlify: https://monumental-twilight-a5371e.netlify.app/

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
