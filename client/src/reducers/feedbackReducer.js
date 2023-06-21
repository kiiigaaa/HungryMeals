export const feedbackReducer = (state = {}, action) => {

    switch (action.type) {

        case 'USER_FEEDBACK_SENDING': return {
            loading: true
        }
        case 'USER_FEEDBACK_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'USER_FEEDBACK_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state

    }
}