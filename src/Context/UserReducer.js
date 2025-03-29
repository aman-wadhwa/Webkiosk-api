const UserReducer = (state, action) => {
    switch(action.type){
        case 'set_login':
            return {
                ...state,
                islogin : true,
                semesters : action.payload
            }
        default:
            return state
    }
}
export default UserReducer