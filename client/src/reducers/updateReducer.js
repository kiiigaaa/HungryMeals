export const updateUserReducer = (state = {}, action) => {

    switch (action.type) {

        case 'USER_UPDATE_REQUEST': return {
            loading: true
        }
        case 'USER_UPDATE_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'USER_UPDATE_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state

    }
}