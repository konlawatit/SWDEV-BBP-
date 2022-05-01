//Actions Type
export const SET_USER = "SET_USER"
export const CLEAR_USER = "CLEAR_USER"

//Action Create
export const setUser = (payloads) => dispatch => {
    dispatch({
        type: SET_USER,
        payloads
    })
}

export const clearUser = (payloads) => dispatch => {
    dispatch({
        type: CLEAR_USER
    })
}
