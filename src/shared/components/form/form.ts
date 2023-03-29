import type { ObjectSchema, AnyObject, Maybe } from "yup";
import { ValidationError } from "yup";
import type { TFormProps } from "./types";
import type { TBlockProps } from "../../utils/block";
import { Block } from "../../utils/block";
import { hasKey } from "../../utils/object";

export abstract class Form<
  TTemplateBlockProps extends TBlockProps,
  TFormElements extends Record<string, Block>,
  TSchema extends Maybe<AnyObject>
> extends Block<TBlockProps<TTemplateBlockProps>> {
  schema: ObjectSchema<TSchema>;

  formElements?: TFormElements;

  protected constructor(props: TFormProps<TTemplateBlockProps, TFormElements, TSchema>) {
    const { schema, formElements, ...restProps } = props;
    const allProps = {
      ...(restProps as Record<string, Block>),
      ...formElements,
    } as TBlockProps<TTemplateBlockProps>;
    super({
      ...allProps,
      events: {
        submit: async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());
          try {
            const data = await this.schema.validate(values, { abortEarly: false });
            console.log("form: ", data);
          } catch (err) {
            if (err instanceof ValidationError) {
              err.inner.forEach(({ path, message }) => {
                if (path && this.formElements && hasKey(this.formElements, path)) {
                  this.formElements[path].setProps({ error: message });
                }
              });
            }
          }
        },
        ...(props.events || []),
      },
    });
    this.schema = schema;
    this.formElements = formElements;
  }
}
