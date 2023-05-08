import { ValidationError } from "yup";
import type { TFormProps, TFormElements, TSchema } from "./types";
import { Block } from "../../utils/block";
import { hasKey, merge } from "../../utils/object";

export abstract class Form<
  T extends Record<string, unknown> = Record<string, unknown>
> extends Block<T> {
  schema?: TSchema;

  formElements?: TFormElements;

  protected constructor(props: TFormProps) {
    const { schema, formElements, isFormData = false, ...restProps } = props;
    const allProps = {
      ...(restProps as T),
      ...formElements,
    };
    super({
      ...allProps,
      events: {
        submit: async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = merge(
            Object.fromEntries(formData.entries()),
            this.getArrayValues(formData)
          );

          try {
            if (this.schema) {
              await this.schema.validate(values, {
                abortEarly: false,
              });
            }

            if (this.formElements) {
              Object.values(this.formElements).forEach((element) => {
                element.setProps({ error: "" });
              });
            }
            console.log("form: ", values);
            this.onSubmit(isFormData ? formData : values);
          } catch (err) {
            if (err instanceof ValidationError) {
              err.inner.forEach(({ path, message }) => {
                if (
                  path &&
                  this.formElements &&
                  hasKey(this.formElements, path)
                ) {
                  this.formElements[path].setProps({ error: message });
                }
              });
            }
          }
        },
        focusout: async (e) => {
          const path = e.target.name as string;
          if (!path || !this.formElements || !hasKey(this.formElements, path)) {
            return;
          }
          const formData = new FormData(e.currentTarget);
          const values = Object.fromEntries(formData.entries());
          try {
            if (this.schema) {
              await this.schema.validateAt(path, values);
            }
            this.formElements[path].setProps({ error: "" });
          } catch (err) {
            if (err instanceof ValidationError) {
              this.formElements[path].setProps({ error: err.message });
            }
          }
        },
        ...(props.events || []),
      },
    });
    this.schema = schema;
    this.formElements = formElements;
  }

  private getArrayValues(formData: FormData): Record<string, unknown[]> {
    const arrayFields: Record<string, unknown[]> = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of formData.entries()) {
      if (key.includes("[]")) {
        const arrKey = key.replace("[]", "");
        if (!hasKey(arrayFields, arrKey)) {
          arrayFields[arrKey] = [];
        }
        arrayFields[arrKey].push(value);
      }
    }

    return arrayFields;
  }

  init() {}
  abstract onSubmit(data: unknown): void;
}
