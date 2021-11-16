const setTokens = (access, refresh) => {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
}
const removeTokens = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}
const getAccessToken = () => {
    return localStorage.getItem('access_token')
}
const getRefreshToken = () => {
    return localStorage.getItem('refresh_token')
}

const getUUID = () => {
    return localStorage.getItem('uuid')
}
const setUUID = (uuid) => {
    localStorage.setItem('uuid', uuid)
}
const removeUUID = () => {
    localStorage.removeItem('uuid')
}

const getCriteriaPsy = () => {
    return localStorage.getItem('criteria')
}
const setCriteriaPsy = (criteria) => {
    localStorage.setItem('criteria', criteria)
}
const removeCriteriaPsy = () => {
    localStorage.removeItem('criteria')
}

export default {
    setTokens,
    removeTokens,
    getAccessToken,
    getRefreshToken,
    getUUID,
    setUUID,
    removeUUID,
    getCriteriaPsy,
    setCriteriaPsy,
    removeCriteriaPsy 
}