const INIIAL_STATE = {
    personal_info: [],
   
}

export default (state = INIIAL_STATE, action) => {
    switch (action.type) {
        case "DONOR":
            return ({
                ...state,
                personal_info: action.payload
            })
    }
    return state;
}