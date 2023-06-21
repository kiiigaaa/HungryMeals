export const getAllJobsReducer=(state={jobs : []}, action) => {


    switch (action.type) 
    {
        case 'GET_JOBS_REQUEST' : return {

            loading : true,
            ...state
        }
        case 'GET_JOBS_SUCCESS' : return {

            loading : false,
            jobs : action.payload
        }
        case 'GET_JOBS_FAILED' : return {

            error : action.payload,
            loading : false
        }

        default : return state
        
    }
}