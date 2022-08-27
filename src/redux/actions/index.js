export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

const submitLogin = (LoginProfile) => ({
  type: LOGIN_SUBMIT,
  user: LoginProfile.email,
});

/* const submitProfessionalForm = (professionalProfile) => ({
  type: PROFESSIONAL_FORM_SUBMIT,
  payload: professionalProfile,
}); */

export { submitLogin };// Coloque aqui suas actions
