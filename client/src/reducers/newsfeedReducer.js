export const getAllNewsReducer=(state={news : []}, action) => {


    switch (action.type) 
    {
        case 'GET_NEWS_REQUEST' : return {

            loading : true,
            ...state
        }
        case 'GET_NEWS_SUCCESS' : return {

            loading : false,
            news : action.payload
        }
        case 'GET_NEWS_FAILED' : return {

            error : action.payload,
            loading : false
        }

        default : return state
        
    }
}