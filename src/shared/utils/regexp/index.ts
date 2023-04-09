export const loginRegexp = /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/;
export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@$%^&*()_\-+]{8,40}$/;
export const nameRegexp = /^[A-ZА-Я][a-zA-ZА-Яа-я0-9-]*/;
export const phoneRegexp = /^\+{0,1}[0-9]{10,15}$/;
