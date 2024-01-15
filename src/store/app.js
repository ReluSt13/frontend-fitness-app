// Utilities
import { defineStore } from "pinia";
import axios from "../utils/axios.js";
import { handleSuccessAuthentication } from "../utils/function.js";

export const useAppStore = defineStore("app", {
  state: () => ({
    snackbar: false,
    snackbarInfo: {},
  }),
  actions: {
    openSnackbar(value) {
      this.snackbar = value;
    },
    async login(payload) {
      const result = await axios
        .post("/User/login", payload)
        .then((response) => handleSuccessAuthentication(response.data))
        .catch((error) => {
          return error.response.data;
        });
      return result;
    },
    logout() {
      localStorage.removeItem("token");
    },
    async register(payload) {
      const response = await axios
        .post("/User/register", payload)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    isLoggedIn() {
      let token = localStorage.getItem("token");
      return token !== null && token.length > 0;
    },
    getToken() {
      return this.isLoggedIn() ? localStorage.getItem("token") : null;
    },
    getUser() {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        let user = JSON.parse(userJson);
        return user;
      }
      return null;
    },
    updateAvatar(avatar) {
      const response = axios
        .post("/User/update-avatar", avatar)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    getPosts() {
      const response = axios
        .get("/getAllPosts")
        .then((response) => {
          const parsedResponse = {
            isSuccess: response.data.isSuccess,
            response: JSON.parse(response.data.response),
            errors: response.data.error
          }
          parsedResponse.response.forEach(post => {
            if (post.Comments === null) {
              post.Comments = [];
            }
            if (post.Feedbacks === null) {
              post.Feedbacks = [];
            }
          });
          return parsedResponse;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    createPost(payload) {
      const response = axios
        .post("/createPost", payload)
        .then((response) => {
          const parsedResponse = {
            isSuccess: response.data.isSuccess,
            response: JSON.parse(response.data.response),
            errors: response.data.error
          }
          if (parsedResponse.response.Comments === null) {
            parsedResponse.response.Comments = [];
          }
          if (parsedResponse.response.Feedbacks === null) {
            parsedResponse.response.Feedbacks = [];
          }

          return parsedResponse;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    deletePost(id) {
      const response = axios
        .delete("/deletePost", { data: { postId: id } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    editPost(payload) {
      const response = axios
        .put("/updatePost", payload)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    createFeedback(payload) {
      const response = axios
        .post("/createFeedback", payload)
        .then((response) => {
          const parsedResponse = {
            isSuccess: response.data.isSuccess,
            response: JSON.parse(response.data.response),
            errors: response.data.error,
          };
          return parsedResponse;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    deleteFeedback(id) {
      const response = axios
        .delete("/deleteFeedback", { data: { postId: id } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    createComment(payload) {
      const response = axios
        .post("/createComment", payload)
        .then((response) => {
          const parsedResponse = {
            isSuccess: response.data.isSuccess,
            response: JSON.parse(response.data.response),
            errors: response.data.error,
          };
          return parsedResponse;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    deleteComment(id) {
      const response = axios
        .delete("/deleteComment", { data: { commentId: id } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    editComment(payload) {
      const response = axios
        .put("/updateComment", payload)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    verifyUser() {
      const response = axios
        .get("/User/verify")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    getAllExercises() {
      const response = axios
        .get("/getAllExercises")
        .then((response) => {
          const parsedResponse = {
            isSuccess: response.data.isSuccess,
            response: JSON.parse(response.data.response),
            errors: response.data.error,
          };
          return parsedResponse;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
  },
});
