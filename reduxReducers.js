import { combineReducers } from "redux";

const bugs = (state = [], action) => {
    switch (action.type) {
        case "SET_DATA":
            return action.data
        default:
            return state
    }
}

const isLoading = (state = true, action) => {
    switch (action.type) {
        case "SET_LOAD":
            return action.loading
        default:
            return state
    }
}

const needsRefresh = (state = false, action) => {
    switch (action.type) {
        case "NEED_REFRESH":
            return action.data
        default:
            return state
    }
}

const allReducers = combineReducers({
    bugs, isLoading, needsRefresh
})


export default allReducers;