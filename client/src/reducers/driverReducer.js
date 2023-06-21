export const driverloginReducer = (state = {}, action) => {

    switch (action.type) {

        case 'DRIVER_LOGIN_REQUEST': return {
            loading: true
        }
        case 'DRIVER_LOGIN_SUCCESS': return {
            loading: false,
            success: true,
            currentDriver : action.payload
        }
        case 'DRIVER_LOGIN_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state

    }
}