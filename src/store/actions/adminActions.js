import actionTypes from "./actionTypes";
import {
  deleteUserService,
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService("GENDER");

      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchGenderFail());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

//Possition
export const fetchPositionStart = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });

      let res = await getAllCodeService("POSITION");

      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchPositionFail());
      console.log(error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

// ROLE

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });

      let res = await getAllCodeService("ROLE");

      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchRoleFail());
      console.log(error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

// Create a new user

export const createUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.CREATE_USER_START });

      let res = await createNewUserService(data);
      console.log("hoidanit check create userredux", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success");
        dispatch(createUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Create a user fail!");
        dispatch(createUserFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(createUserFail());
      console.log(error);
    }
  };
};

export const createUserSuccess = (genderData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: genderData,
});

export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

// delete a user

export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete a user success");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete fail!");
        dispatch(deleteUserFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(deleteUserFail());
      console.log(error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

// edit a user

export const editUserStart = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success("Edit a user success");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Edit fail!");
        dispatch(editUserFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(editUserFail());
      console.log(error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

// get all user

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("fetch all users fail!");
        dispatch(fetchAllUsersFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchAllUsersFail());
      console.log(error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL,
});

// fetch top doctors

export const fetchTopDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("6");

      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data));
      } else {
        toast.error("fetch all top doctors fail!");
        dispatch(fetchTopDoctorsFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchTopDoctorsFail());
      console.log(error);
    }
  };
};

export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  doctors: data,
});

export const fetchTopDoctorsFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
});

// fetch all doctors

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();

      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        toast.error("fetch all top doctors fail!");
        dispatch(fetchAllDoctorsFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchAllDoctorsFail());
      console.log(error);
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  doctors: data,
});

export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
});

// save a doctor

export const saveADoctorsStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);

      if (res && res.errCode === 0) {
        dispatch(saveADoctorsSuccess());
        toast.success("Save a doctor success");
      } else {
        toast.error("Save a doctor fail");
        dispatch(saveADoctorsFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(saveADoctorsFail());
      console.log(error);
    }
  };
};

export const saveADoctorsSuccess = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveADoctorsFail = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
});

// fetch all hour schedule

export const fetchAllHourStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllHourSuccess(res.data));
      } else {
        dispatch(fetchAllHourFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchAllHourFail());
      console.log(error);
    }
  };
};

export const fetchAllHourSuccess = (hoursData) => ({
  type: actionTypes.FETCH_ALLCODES_HOUR_SUCCESS,
  data: hoursData,
});

export const fetchAllHourFail = () => ({
  type: actionTypes.FETCH_ALLCODES_HOUR_FAIL,
});

//price
export const fetchDoctorPriceStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PRICE");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorPriceSuccess(res.data));
      } else {
        dispatch(fetchDoctorPriceFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchDoctorPriceFail());
      console.log(error);
    }
  };
};

export const fetchDoctorPriceSuccess = (genderData) => ({
  type: actionTypes.FETCH_ALLCODES_PRICE_SUCCESS,
  data: genderData,
});

export const fetchDoctorPriceFail = () => ({
  type: actionTypes.FETCH_ALLCODES_PRICE_FAIL,
});

//payment
export const fetchDoctorPaymentStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PAYMENT");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorPaymentSuccess(res.data));
      } else {
        dispatch(fetchDoctorPaymentFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchDoctorPaymentFail());
      console.log(error);
    }
  };
};

export const fetchDoctorPaymentSuccess = (genderData) => ({
  type: actionTypes.FETCH_ALLCODES_PAYMENT_SUCCESS,
  data: genderData,
});

export const fetchDoctorPaymentFail = () => ({
  type: actionTypes.FETCH_DOCTOR_PAYMENT_FAIL,
});

//province
export const fetchDoctorProvinceStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("PROVINCE");
      if (res && res.errCode === 0) {
        dispatch(fetchDoctorProvinceSuccess(res.data));
      } else {
        dispatch(fetchDoctorProvinceFail());
      }
    } catch (error) {
      toast.error("Get some error");
      dispatch(fetchDoctorProvinceFail());
      console.log(error);
    }
  };
};

export const fetchDoctorProvinceSuccess = (genderData) => ({
  type: actionTypes.FETCH_ALLCODES_PROVINCE_SUCCESS,
  data: genderData,
});

export const fetchDoctorProvinceFail = () => ({
  type: actionTypes.FETCH_DOCTOR_PROVINCE_FAIL,
});
