import { message } from '../utils/messages';
import * as yup from 'yup';

const ProfileSchema = yup.object().shape({
    firstName: yup.string().required(message.FORM_VALIDATIONS.FIRST_NAME.REQUIRED),
    lastName: yup.string().required(message.FORM_VALIDATIONS.LAST_NAME.REQUIRED),
    email: yup.string().email(message.FORM_VALIDATIONS.EMAIL.INVALID).required(message.FORM_VALIDATIONS.EMAIL.REQUIRED),
    mobileNumber: yup.string().matches(/^[0-9]{10}$/, message.FORM_VALIDATIONS.MOBILE.INVALID).required(message.FORM_VALIDATIONS.MOBILE.REQUIRED),
});

const LoginSchema = yup.object().shape({
    email: yup.string().email(message.FORM_VALIDATIONS.EMAIL.INVALID).required(message.FORM_VALIDATIONS.EMAIL.REQUIRED),
    password: yup.string().required(message.FORM_VALIDATIONS.PASSWORD.REQUIRED),
});

const ChangePasswordSchema = yup.object().shape({
    currentpassword: yup.string().required(message.FORM_VALIDATIONS.CURRENT_PASSWORD.REQUIRED),
    newPassword: yup.string().required(message.FORM_VALIDATIONS.NEW_PASSWORD.REQUIRED).min(8, message.FORM_VALIDATIONS.NEW_PASSWORD.MIN_LENGTH),
    confirmNewPassword: yup.string().required(message.FORM_VALIDATIONS.CONFIRM_PASSWORD.REQUIRED)
        .oneOf([yup.ref('newPassword'), null], message.FORM_VALIDATIONS.CONFIRM_PASSWORD.NOT_MATCH),
});

const SignupSchema = yup.object().shape({
    firstName: yup.string().required(message.FORM_VALIDATIONS.FIRST_NAME.REQUIRED),
    lastName: yup.string().required(message.FORM_VALIDATIONS.LAST_NAME.REQUIRED),
    email: yup.string().email(message.FORM_VALIDATIONS.EMAIL.VALID).required(message.FORM_VALIDATIONS.EMAIL.REQUIRED),
    mobileNumber: yup.string().matches(/^[0-9]{10}$/, message.FORM_VALIDATIONS.MOBILE.INVALID).required(message.FORM_VALIDATIONS.MOBILE.REQUIRED),
    password: yup.string().required(message.FORM_VALIDATIONS.PASSWORD.REQUIRED).min(8, message.FORM_VALIDATIONS.PASSWORD.MIN_LENGTH),
    confirmPassword: yup.string().required(message.FORM_VALIDATIONS.CONFIRM_PASSWORD.REQUIRED)
        .oneOf([yup.ref('password'), null], message.FORM_VALIDATIONS.CONFIRM_PASSWORD.NOT_MATCH),
});

export { ProfileSchema, LoginSchema, ChangePasswordSchema, SignupSchema };