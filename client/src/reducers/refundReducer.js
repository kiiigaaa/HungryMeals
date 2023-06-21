export const addRefundReducer=(state={}, action) => {


    switch (action.type) 
    {
        case 'ADD_REFUND_REQUEST' : return {

            loading : true,
            ...state
        }
        case 'ADD_REFUND_SUCCESS' : return {

            loading : false,
            success:true,
        }
        case 'ADD_REFUND_FAILED' : return {

            error : action.payload,
            loading : false
        }

        default : return state
        
    }
}


export const getAllRefundsReducer=(state={refunds : []}, action) => {


    switch (action.type) 
    {
        case 'GET_ALLREFUNDS_REQUEST' : return {

            loading : true,
            ...state
        }
        case 'GET_ALLREFUNDS_SUCCESS' : return {

            loading : false,
            orders : action.payload
        }
        case 'GET_ALLREFUNDS_FAILED' : return {

            error : action.payload,
            loading : false
        }

        default : return state
        
    }
}