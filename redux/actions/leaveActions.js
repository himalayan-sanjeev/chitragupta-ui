import axios from 'axios'
import {
  GET_LEAVE_REQUESTS,
  ADD_LEAVE_REQUEST,
  DELETE_LEAVE_REQUEST,
  UPDATE_LEAVE_REQUEST,
  SET_SELECTED_LEAVE,
  LEAVE_REQUESTS_LOADING,
  SHOW_LEAVE_MODAL
} from './types'
import { returnErrors, clearErrors } from './errorActions'
import { tokenConfig } from './authActions'
import Jsona from 'jsona'

const dataFormatter = new Jsona()

//action to get leave requests
export const fetchLeaveRequests = allRequests => (dispatch, getState) => {
  dispatch(setLoadingState(true))
  axios
    .get(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests.json?all_leaves=${allRequests}`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: GET_LEAVE_REQUESTS,
        payload: dataFormatter.deserialize(res.data)
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

//set selected leave requests
export const setSelectedLeave = leave => dispatch => {
  dispatch({ type: SET_SELECTED_LEAVE, payload: leave })
}

//action to show hide leave modal
export const setLeaveModal = modal => dispatch => {
  dispatch(clearErrors())
  dispatch({ type: SHOW_LEAVE_MODAL, payload: modal })
}
//action to update leave requests
export const updateLeaveRequest = () => (dispatch, getState) => {
  //get currently selected leave
  const leave_request = getState().leave.selectedLeave
  const body = JSON.stringify({ leave_request: leave_request })
  axios.put(`${process.env.NEXT_PUBLIC_REMOTE_URL}/api/v1/leave_requests/${leave_request.id}.json`,body,tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_LEAVE_REQUEST })
      dispatch(fetchLeaveRequests())
      dispatch(setLeaveModal(false))
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const setLoadingState = state => dispatch => {
  dispatch({ type: LEAVE_REQUESTS_LOADING, payload: state })
}
