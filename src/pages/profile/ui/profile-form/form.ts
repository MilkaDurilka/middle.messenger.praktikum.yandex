import { Button, Input, Link, Form } from "../../../../shared/components";
import template from "./template.hbs";
import type { TProfileForm, TProfileFormProps, TFormElements } from "./types";
import { EForm } from "./types";
import { ROUTES } from "../../../../shared/router";
import {
  getValidationSchema,
  Validation,
} from "../../../../shared/utils/validation";
import type { TUpdateProfileData } from "../../../../entitites/user/types";
import { userController } from "../../../../entitites/user";
import { hasKey } from "../../../../shared/utils/object";
import { withUser } from "../../../../entitites/user/store";

const profileSchema = getValidationSchema<TProfileForm>({
  [EForm.email]: Validation.email(),
  [EForm.login]: Validation.login(),
  [EForm.firstName]: Validation.name(),
  [EForm.secondName]: Validation.name(),
  [EForm.displayName]: Validation.stringRequired(),
  [EForm.phone]: Validation.phone(),
});

const getFormElements = (props: TProfileFormProps): TFormElements => {
  const userData = props.user.data;
  const formElementsProps = {
    [EForm.email]: { label: "Email" },
    [EForm.login]: { label: "Login" },
    [EForm.firstName]: { label: "First Name" },
    [EForm.secondName]: { label: "Second Name" },
    [EForm.displayName]: { label: "Nickname" },
    [EForm.phone]: { label: "Phone" },
  };

  return Object.entries(formElementsProps).reduce<TFormElements>(
    (acc, [id, elProps]) => {
      const value =
        userData && hasKey(userData, id) && userData[id]
          ? userData[id].toString()
          : "";
      acc[id as EForm] = new Input({
        id,
        name: id,
        label: elProps.label,
        placeholder: elProps.label,
        value,
      });
      return acc;
    },
    {} as TFormElements
  );
};

class ProfileFormBase extends Form<TProfileFormProps> {
  constructor(props: TProfileFormProps) {
    super({
      schema: profileSchema,
      formElements: getFormElements(props),
      linkChangePassword: new Link({
        text: "Change password",
        to: ROUTES.changePassword,
      }),
      buttonSubmit: new Button({
        type: "submit",
        text: "Edit",
      }),
    });
  }

  onSubmit(data: TUpdateProfileData) {
    return userController.updateProfile(data);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ProfileForm = withUser(ProfileFormBase);
