import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    wishlistCount: 0,
}
export default (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case types.SUCCESS_WISHLIST:
            return {
                ...state,
                wishlistCount: payload.wishlistData.totalCount,
                wishlistData: payload.wishlistData.wishlistData
            }
        default:
            return state;
    }
}
