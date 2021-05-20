import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://www.forum-uit.codes/api/auth/";
// const API_URL = "http://localhost:5000/api/auth/";

const register = (
  name,
  companyName,
  username,
  email,
  password,
  role,
  etablishment_idx = 0
) => {
  name = name.toLowerCase();
  username = username.toLowerCase();
  const etablishment_id = parseInt(etablishment_idx);
  return role === 1
    ? axios.post(API_URL + "signup/1", {
        name,
        companyName,
        username,
        email,
        password,
        etablishment_id,
      })
    : axios.post(API_URL + "signup/3", {
        name,
        companyName,
        username,
        email,
        password,
        etablishment_id,
      });
};

const login = (usernameOrEmail, password) => {
  return axios
    .post(API_URL + "signin", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const verify = (token) => {
  console.log(API_URL + "verify/" + token);
  return axios.post(API_URL + "verify/" + token).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const deleteUser = (id) => {
  return axios({
    method: "delete",
    url: API_URL + "deleteUser/" + id,
    headers: authHeader(),
  });
};
const disableAccount = (id) => {
  return axios.put(`${API_URL}disableAccount/${id}`);
};
const reportByPost = (postId) => {
  return axios.put(`${API_URL}reportbypost/${postId}`);
};
const reportByComment = (commentId) => {
  return axios.put(`${API_URL}reportbycomment/${commentId}`);
};
const removeReport = (id) => {
  return axios.put(`${API_URL}unreportbyid/${id}`);
};
const authService = {
  register,
  login,
  logout,
  verify,
  removeReport,
  getCurrentUser,
  deleteUser,
  disableAccount,
  reportByPost,
  reportByComment,
};

export default authService;
