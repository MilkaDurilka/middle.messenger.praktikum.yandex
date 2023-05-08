import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Поле '${path}' обязательно для заполнения",
    oneOf: "Пароли должны совпадать",
  },
  string: {
    min: "Поле '${path}' должно состоять минимиум из ${min} символов",
    max: "Поле '${path}' должно состоять максимум из ${max} символов",
  },
});

export const localeValidation = {
  arrayRequired: "Выберите хотя бы один элемент",
  loginRegexp:
    "Поле '${path} от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'",
  nameRegexp:
    "Поле '${path} от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'",
  phoneRegexp:
    "Поле '${path} от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
  passwordRegexp:
    "Поле '${path}' должно иметь от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
};
