import { SET_USER } from "../actions/main";

let stateInit = {
    email: "",
    user_name: "",
}

const mainReducter = (state = {email: "", user_name: ""}, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, email: action.payload.email, user_name: action.payload.user_name}
        default:
            return {...state}
    }
}

export default mainReducter;