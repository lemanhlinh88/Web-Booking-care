import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  isLoadingGender: false,
  roles: [],
  isLoadingRole: false,
  positions: [],
  isLoadingPosition: false,
  users: [],
  isLoadingUsers: false,
  topDoctors: [],
  allDoctors: [],
  allTime: [],

  allPrice: [],
  allPayment: [],
  allProvince: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        isLoadingGender: false,
        genders: action.data,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        isLoadingPosition: true,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        isLoadingPosition: false,
        positions: action.data,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      return {
        ...state,
        isLoadingPosition: false,
      };
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        isLoadingRole: true,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        isLoadingRole: false,
        roles: action.data,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
        isLoadingRole: false,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        users: action.users,
      };
    case actionTypes.FETCH_ALL_USERS_FAIL:
      return {
        ...state,
        isLoadingUsers: false,
        users: [],
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        topDoctors: action.doctors,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAIL:
      return {
        ...state,
        topDoctors: [],
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.doctors,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAIL:
      return {
        ...state,
        allDoctors: [],
      };
    case actionTypes.FETCH_ALLCODES_HOUR_SUCCESS:
      return {
        ...state,
        allTime: action.data,
      };
    case actionTypes.FETCH_ALLCODES_HOUR_FAIL:
      return {
        ...state,
        allTime: [],
      };

    case actionTypes.FETCH_ALLCODES_PRICE_SUCCESS:
      return {
        ...state,
        allPrice: action.data,
      };
    case actionTypes.FETCH_ALLCODES_PRICE_FAIL:
      return {
        ...state,
        allPrice: [],
      };
    case actionTypes.FETCH_ALLCODES_PAYMENT_SUCCESS:
      return {
        ...state,
        allPayment: action.data,
      };
    case actionTypes.FETCH_ALLCODES_PAYMENT_FAIL:
      return {
        ...state,
        allPayment: [],
      };
    case actionTypes.FETCH_ALLCODES_PROVINCE_SUCCESS:
      return {
        ...state,
        allProvince: action.data,
      };
    case actionTypes.FETCH_ALLCODES_PROVINCE_FAIL:
      return {
        ...state,
        allProvince: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
