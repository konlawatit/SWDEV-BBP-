import { SET_NAME } from "../actions/main";

let stateInit = {
    name: ""
}

const mainReducter = (state = stateInit, action) => {
    switch (action.type) {
        case SET_NAME:
            console.log(action, 'test')
            return {...state, name: "bas"}
        default:
            return {...state}
    }   
    
}

export default mainReducter;