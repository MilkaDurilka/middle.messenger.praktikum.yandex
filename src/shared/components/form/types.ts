import type { ObjectSchema, AnyObject, Maybe } from "yup";
import type { Block } from "../../utils/block";

export type TFormElements = Record<string, Block>;

export type TSchema = ObjectSchema<Maybe<AnyObject>>;

export type TFormProps = {
  schema?: TSchema;
  formElements?: TFormElements;
  isFormData?: boolean;
} & Record<string, unknown>;
