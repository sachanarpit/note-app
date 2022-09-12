import axios from "axios";

export const SignInReq = (api, email, password) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/login`;
      axios
        .post(uri, null, {
          params: {
            email,
            password,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

export const SignUpReq = (api, email, password, name) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/register`;
      axios
        .post(uri, null, {
          params: {
            email,
            password,
            name,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
export const forgetPasswordReq = (api, email) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/forgetpassword`;
      axios
        .post(uri, null, {
          params: {
            email,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

export const CreateNoteReq = (api, email) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/create`;
      axios
        .post(uri, null, {
          params: {
            email,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
