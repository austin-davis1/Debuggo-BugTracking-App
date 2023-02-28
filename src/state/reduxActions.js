export const setData = (data) => {
    return {
        type: "SET_DATA",
        data: data
    }
}

export const setProjects = (data) => {
    return {
        type: "SET_PROJECTS",
        data: data
    }
}

export const setLoading = (data) => {
    return {
        type: "SET_LOAD",
        loading: data
    }
}

export const setRefresh = (data) => {
    return {
        type: "NEED_REFRESH",
        data: data
    }
}

export const setModal = (data) => {
    return {
        type: "MODAL_SWITCH",
        data: data
    }
}

export const setDelete = (data) => {
    return {
        type: "DELETE_ID",
        data: data
    }
}

export const setModalType = (data) => {
    return {
        type: "MODAL_TYPE",
        data: data
    }
}
