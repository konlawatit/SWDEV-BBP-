//Actions Type
export const SET_USER = "SET_USER"

//Action Create
export const setUser = (payload) => dispatch => {
    dispatch({
        type: SET_USER,
        payload
    })
}