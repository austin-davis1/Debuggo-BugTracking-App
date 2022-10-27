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

const deleteModal = (state = false, action) => {
    switch (action.type) {
        case "MODAL_SWITCH":
            return action.data
        default:
            return state
    }
}

const selectedDelete = (state = null, action) => {
    switch (action.type) {
        case "DELETE_ID":
            return action.data
        default:
            return state
    }
}

const modalType = (state = "", action) => {
    switch(action.type) {
        case "MODAL_TYPE":
            return action.data
        default:
            return state
    }
}

const allReducers = combineReducers({
    bugs, isLoading, needsRefresh, 
    deleteModal, selectedDelete, modalType
})


export default allReducers;