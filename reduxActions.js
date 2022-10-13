export const setData = (data) => {
    return {
        type: "SET_DATA",
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