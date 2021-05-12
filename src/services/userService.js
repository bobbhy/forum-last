import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://www.forum-uit.codes/";
//const API_URL = "http://localhost:5000/";

const getApiState = () => {
  return axios.get(API_URL + "hello");
};

const getAllCompanies = () => {
  return axios.get(API_URL + "api/comp/companies", { headers: authHeader() });
};
const getAllStudents = () => {
  return axios.get(API_URL + "api/cv/students", { headers: authHeader() });
};
const getUsersLike = (key) => {
  return axios.get(API_URL + "api/profile/" + key, { headers: authHeader() });
};
const getEtablishements = () => {
  return axios.get(API_URL + "api/profile/etablishment/all");
};
const connectTo = (id) => {
  return axios({
    method: "post",
    url: API_URL + "api/profile/add/" + id,
    headers: authHeader(),
  });
};
const priveCv = (id) => {
  return axios.put(`${API_URL}api/cv/prive/${id}`);
};
const unpriveCv = (id) => {
  return axios.put(`${API_URL}api/cv/unprive/${id}`);
};
const disconnect = (id) => {
  return axios({
    method: "delete",
    url: API_URL + "api/profile/disconnect/" + id,
    headers: authHeader(),
  });
};
const accept = (id) => {
  return axios({
    method: "post",
    url: API_URL + "api/profile/accept/" + id,
    headers: authHeader(),
  });
};

// const cvSearch = (key) => {
//   return axios.get(API_URL + "api/cv/search/" + key);
// };

// const companySearch = (key) => {
//   return axios.get(API_URL + "api/comp/search/" + key);
// };

const getUserData = () => {
  return axios.get(API_URL + "api/profile", { headers: authHeader() });
};

const getCurrentImage = () => {
  return axios.get(`${API_URL}api/cv/image`, {
    headers: authHeader(),
  });
};

const getCurrentCompanyImage = () => {
  return axios.get(`${API_URL}api/comp/image`, {
    headers: authHeader(),
  });
};

const getImageById = (id) => {
  return axios.get(`${API_URL}api/cv/image/${id}`);
};

const getCompanyImageById = (id) => {
  return axios.get(`${API_URL}api/comp/image/${id}`);
};

const getUserById = (id) => {
  return axios.get(API_URL + `api/cv/${id}`);
};

const handleNotif = () => {
  return axios({
    method: "post",
    url: API_URL + "api/profile/notifications",
    headers: authHeader(),
  });
};
const handleSingleNotif = (id) => {
  return axios({
    method: "post",
    url: API_URL + `api/profile/notification/${id}`,
    headers: authHeader(),
  });
};
const deleteNotification = (id) => {
  return axios({
    method: "delete",
    url: API_URL + `api/profile/notification/${id}`,
    headers: authHeader(),
  });
};
const deleteMesssage = (id) => {
  return axios({
    method: "delete",
    url: API_URL + `api/profile/message/${id}`,
    headers: authHeader(),
  });
};
const getAllConversations = () => {
  return axios.get(API_URL + "api/profile/all", {
    headers: authHeader(),
  });
};
const sendMessage = (messagePayload) => {
  return axios.post(API_URL + "api/profile/sendMessage", messagePayload, {
    headers: authHeader(),
  });
};
const getMessages = (id) => {
  return axios.get(API_URL + `api/profile/allMessages/${id}`, {
    headers: authHeader(),
  });
};
const getAllNotifications = () => {
  return axios.get(API_URL + "api/profile/allNotifications", {
    headers: authHeader(),
  });
};
const getLikesByPost = (postId) => {
  return axios.get(`${API_URL}api/cv/likesbypost/${postId}`);
};
const getPosts = () => {
  return axios.get(`${API_URL}api/cv/getPosts`);
};
const getPostById = async (postId) => {
  return await axios.get(`${API_URL}api/cv/post/${postId}`);
};
const getPostComments = (postId) => {
  return axios.get(`${API_URL}api/cv/post/${postId}/comment`);
};
const contactUs = async (contact) => {
  return await axios.post(`${API_URL}contact/message`, contact);
};
const getNonPrivatePosts = () => {
  return axios.get(`${API_URL}api/cv/getNonPosts`, {
    headers: authHeader(),
  });
};
const getAll = async () => {
  return await axios.get(`${API_URL}api/profile/getall`, {
    headers: authHeader(),
  }); // buggy
};
const enable = async (id) => {
  return await axios.put(`${API_URL}api/cv/enable/${id}`);
};
const updateStudentPost = (id, post) => {
  return axios.put(`${API_URL}api/cv/post/${id}`, post);
};
const updateCompanyPost = (id, post) => {
  return axios.put(`${API_URL}api/comp/post/${id}`, post);
};
const deleteComment = (id) => {
  return axios.delete(`${API_URL}api/cv/comment/${id}`);
};
const uploadStudentComment = (postId, comment) => {
  return axios.post(`${API_URL}api/cv/post/${postId}/comment`, comment, {
    headers: authHeader(),
  });
};
const uploadCompanyComment = (postId, comment) => {
  return axios.post(`${API_URL}api/comp/post/${postId}/comment`, comment, {
    headers: authHeader(),
  });
};
const updateStudentComment = (id, comment) => {
  return axios.put(`${API_URL}api/cv/comment/${id}`, comment);
};
const updateCompanyComment = (id, comment) => {
  return axios.put(`${API_URL}api/comp/comment/${id}`, comment);
};
const likeComment = (commentId, userId) => {
  return axios.put(`${API_URL}api/cv/comment/${commentId}/${userId}/liking`);
};
const deletePostById = (postId) => {
  return axios.delete(`${API_URL}api/cv/post/${postId}`);
};
const unlikeComment = (commentId) => {
  return axios.delete(`${API_URL}api/cv/comment/${commentId}/unliking`, {
    headers: authHeader(),
  });
};
const likePost = (postId, userId) => {
  return axios.put(`${API_URL}api/cv/post/${postId}/${userId}/liking`);
};
const unlikePost = (postId) => {
  return axios.delete(`${API_URL}api/cv/post/${postId}/unliking`, {
    headers: authHeader(),
  });
};
const uploadStudentPost = (post) => {
  return axios.post(`${API_URL}api/cv/uploadPost`, post, {
    headers: authHeader(),
  });
};
const uploadCompanyPost = (post) => {
  return axios.post(`${API_URL}api/comp/uploadPost`, post, {
    headers: authHeader(),
  });
};
const getAbout = () => {
  return axios.get(`${API_URL}api/cv/about`, {
    headers: authHeader(),
  });
};
const uploadAboutCompany = (address, city, number, bio, socials) => {
  return axios.post(
    `${API_URL}api/comp/about`,
    {
      address,
      city,
      number,
      bio,
      socials,
    },
    { headers: authHeader() }
  );
};
const flagCompany = (id) => {
  return axios.put(`${API_URL}api/comp/flag/${id}`);
};
const flagStudent = (id) => {
  return axios.put(`${API_URL}api/cv/flag/${id}`);
};
const getDevLang = () => {
  return axios.get(`${API_URL}api/cv/dev`, {
    headers: authHeader(),
  });
};
const uploadDevLang = (name, value, icon) => {
  return axios.post(
    `${API_URL}api/cv/dev`,
    {
      name,
      value,
      icon,
    },
    { headers: authHeader() }
  );
};
const deleteDevLang = (id) => {
  return axios.delete(`${API_URL}api/cv/dev/${id}`);
};
const getNormalLang = () => {
  return axios.get(`${API_URL}api/cv/normal`, {
    headers: authHeader(),
  });
};
const uploadNormalLang = (name, value) => {
  return axios.post(
    `${API_URL}api/cv/normal`,
    {
      name,
      value,
    },
    { headers: authHeader() }
  );
};
const deleteNormalLang = (id) => {
  return axios.delete(`${API_URL}api/cv/normal/${id}`);
};
const getSoftware = (id) => {
  return axios.get(`${API_URL}api/cv/software`, {
    headers: authHeader(),
  });
};
const uploadSoftware = (name, value, icon) => {
  return axios.post(
    `${API_URL}api/cv/software`,
    {
      name,
      value,
      icon,
    },
    { headers: authHeader() }
  );
};
const deleteSoftware = (id) => {
  return axios.delete(`${API_URL}api/cv/software/${id}`);
};
const getAward = () => {
  return axios.get(`${API_URL}api/cv/award`, {
    headers: authHeader(),
  });
};
const uploadAbout = (
  firstName,
  lastName,
  address,
  city,
  number,
  bio,
  socials,
  interests,
  domaine
) => {
  return axios.post(
    `${API_URL}api/cv/about`,
    {
      firstName,
      lastName,
      address,
      city,
      number,
      bio,
      socials,
      interests,
      domaine,
    },
    { headers: authHeader() }
  );
};
const uploadAward = (organizer, name, position) => {
  return axios.post(
    `${API_URL}api/cv/award`,
    {
      organizer,
      name,
      position,
    },
    { headers: authHeader() }
  );
};
const deleteAward = (id) => {
  return axios.delete(`${API_URL}api/cv/award/${id}`);
};
const getEducation = () => {
  return axios.get(`${API_URL}api/cv/education`, {
    headers: authHeader(),
  });
};
const uploadEducation = (school, diploma, dateStart, dateEnd, field) => {
  return axios.post(
    `${API_URL}api/cv/education`,
    {
      school,
      diploma,
      dateStart,
      dateEnd,
      field,
    },
    { headers: authHeader() }
  );
};
const deleteEducation = (id) => {
  return axios.delete(`${API_URL}api/cv/education/${id}`);
};
const getExperience = () => {
  return axios.get(`${API_URL}api/cv/experience`, {
    headers: authHeader(),
  });
};
const uploadExperience = (
  occupation,
  company,
  dateStart,
  dateEnd,
  description,
  isProject
) => {
  return axios.post(
    `${API_URL}api/cv/experience`,
    { occupation, company, dateStart, dateEnd, description, isProject },
    { headers: authHeader() }
  );
};
const getExperienceById = (id) => {
  return axios.get(`${API_URL}api/cv/getexperiencebyid/${id}`);
};
const deleteExperience = (id) => {
  return axios.delete(`${API_URL}api/cv/experience/${id}`);
};
const updateAboutCompany = (id, about) => {
  return axios.put(`${API_URL}api/comp/about/${id}`, about);
};
const updateAbout = (id, about) => {
  return axios.put(`${API_URL}api/cv/updateAbout/${id}`, about);
};
const deleteMessage = (id) => {
  return axios.delete(`https://www.forum-uit.codes/contact/message/${id}`);
};
const getEducationById = (id) => {
  return axios.get(`${API_URL}api/cv/geteducationbyid/${id}`);
};
const editEducation = (id, education) => {
  return axios.put(`${API_URL}api/cv/updateEducation/${id}`, education);
};
const getCvLinks = () => {
  return axios.get(`${API_URL}api/cv/link`, { headers: authHeader() });
};
const getCompanyLinks = () => {
  return axios.get(`${API_URL}api/comp/link`, { headers: authHeader() });
};
const getDashMessages = () => {
  return axios.get("https://www.forum-uit.codes/contact/messages");
};
const sendViewNotification = (id, pid) => {
  return axios.post(`${API_URL}api/comp/notif/${id}/${pid}`);
};
const uploadCvLink = (link) => {
  return axios.put(`${API_URL}api/cv/link`, link, { headers: authHeader() });
};
const uploadCompanyLink = (link) => {
  return axios.put(`${API_URL}api/comp/link`, link, { headers: authHeader() });
};
const getUnenabledManagers = () => {
  return axios.get(`${API_URL}api/comp/unenabled`);
};
const editExperience = (id, experience) => {
  return axios.put(`${API_URL}api/cv/updateExperience/${id}`, experience);
};
const imageLink = `${API_URL}upload/static/images/`;
const uploadImageUrl = `${API_URL}api/cv/image`;
const uploadImageUrlCompany = `${API_URL}api/comp/image`;
const userService = {
  getApiState,
  getSoftware,
  getAward,
  getAbout,
  uploadSoftware,
  uploadAbout,
  deleteSoftware,
  getAllConversations,
  getUserData,
  getAllStudents,
  getExperienceById,
  editExperience,
  connectTo,
  deleteAward,
  disconnect,
  getEducation,
  uploadEducation,
  deleteEducation,
  getExperience,
  getDashMessages,
  uploadExperience,
  updateAboutCompany,
  deleteExperience,
  uploadAward,
  getUnenabledManagers,
  flagCompany,
  getEducationById,
  editEducation,
  updateAbout,
  sendViewNotification,
  accept,
  deleteNotification,
  getAllCompanies,
  getUserById,
  getCurrentImage,
  deleteDevLang,
  uploadAboutCompany,
  getImageById,
  getNormalLang,
  uploadNormalLang,
  deleteNormalLang,
  getDevLang,
  getCurrentCompanyImage,
  getUsersLike,
  getCompanyImageById,
  handleNotif,
  uploadDevLang,
  handleSingleNotif,
  uploadCompanyPost,
  sendMessage,
  uploadCvLink,
  uploadCompanyLink,
  getMessages,
  likePost,
  flagStudent,
  unlikePost,
  deleteMesssage,
  uploadStudentPost,
  uploadStudentComment,
  uploadCompanyComment,
  getAllNotifications,
  getLikesByPost,
  getPosts,
  getPostById,
  contactUs,
  priveCv,
  unpriveCv,
  getEtablishements,
  getNonPrivatePosts,
  getAll,
  updateStudentPost,
  getCvLinks,
  getCompanyLinks,
  enable,
  deleteMessage,
  deleteComment,
  updateStudentComment,
  updateCompanyComment,
  likeComment,
  deletePostById,
  getPostComments,
  unlikeComment,
  imageLink,
  uploadImageUrl,
  uploadImageUrlCompany,
  updateCompanyPost 
};
export default userService;
