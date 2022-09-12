import axios from "axios";

export const getAllPosts = (api, email) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/getnote`;
      axios
        .get(uri, {
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

export const getSiglePost = (api, email, noteid) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/getsinglenote`;
      axios
        .get(uri, {
          params: {
            email,
            noteid,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

export const getPublicNote = (api, noteid) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/getpublicnote`;
      axios
        .get(uri, {
          params: {
            noteid,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
