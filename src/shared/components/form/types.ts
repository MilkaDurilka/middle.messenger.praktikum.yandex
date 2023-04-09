import type { ObjectSchema, AnyObject, Maybe } from "yup";
import type { TBlockProps } from "../../utils/block";

export type TFormProps<
  TTemplateBlockProps extends TBlockProps,
  TElementsForm,
  TObjectSchema extends Maybe<AnyObject>
> = TBlockProps<
  Pick<TTemplateBlockProps, Exclude<keyof TTemplateBlockProps, keyof TElementsForm>>
> & {
  schema: ObjectSchema<TObjectSchema>;
  formElements?: TElementsForm;
};
