import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post(`api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`api/delete-user`, { data: { id: userId } });
};

const editUserService = (data) => {
  return axios.put(`api/edit-user`, data);
};

const getAllCodeService = (inputType) => {
  return axios.get(`api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post(`api/save-infor-doctors`, data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`api/get-detail-doctor?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
