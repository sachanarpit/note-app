import axios from "axios";

export const UpdatePost = (api, note, title, email, noteid, isPublic) => {
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/updatenote`;
      let data = {
        notes: note,
        title: title,
        tag: [],
      };
      axios
        .patch(uri, data, {
          params: {
            email,
            noteid,
            isPublic,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
export const UpdateStatus = (api, noteid, isPublic) => {
  console.log("api:", api);
  console.log("noteid:", noteid);
  console.log("isPublic:", isPublic);
  return new Promise((resolve, reject) => {
    try {
      let uri = `${api}/note/updateStatus`;

      axios
        .patch(uri, null, {
          params: {
            noteid,
            isPublic,
          },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};
