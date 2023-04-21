import type { ISchema, ObjectSchema } from "yup";
import { object, ref, string, array } from "yup";
import {
  loginRegexp,
  nameRegexp,
  passwordRegexp,
  phoneRegexp,
} from "../regexp";
import { localeValidation } from "../locale";

export const Validation = {
  array: () => array().required(localeValidation.arrayRequired),
  stringRequired: () => string().required(),
  password: () =>
    string().required().min(8).max(40).matches(passwordRegexp, {
      message: localeValidation.passwordRegexp,
    }),
  confirmPassword: (field: string) =>
    string()
      .required()
      .oneOf([ref(field)]),
  login: () =>
    string().required().min(3).max(20).matches(loginRegexp, {
      message: localeValidation.loginRegexp,
    }),
  email: () => string().required().email(),
  name: () =>
    string().required().matches(nameRegexp, {
      message: localeValidation.nameRegexp,
    }),
  phone: () =>
    string()
      .required()
      .min(10)
      .max(15)
      .matches(phoneRegexp, { message: localeValidation.phoneRegexp }),
};

type TObj = Record<string, ISchema<any>>;
export const getValidationSchema = <T extends Record<string, any>>(
  obj: Record<keyof T, ISchema<any>>
): ObjectSchema<T> => object(obj as TObj) as ObjectSchema<T>; // TODO: не понимаю как убрать as
