export const jobApplyReducer = (state = {}, action) => {

    switch (action.type) {

        case 'JOB_APPLICATION_SENDING': return {
            loading: true
        }
        case 'JOB_APPLICATION_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'JOB_APPLICATION_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state

    }
}