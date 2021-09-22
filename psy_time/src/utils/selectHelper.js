const mapSelectOptions = (data) => {
    return data.map(v => {
        const name = v.name || v
        return { value: name, label: name }
    })
}

const mapSelectTimezoneOptions = (data) => {
    return data.map(v => {
        const name = v.name
        if(typeof v === 'object' && v !== null){
            return { value: name, label: name + ` (${v.offset})` }
        }
        return { value: name, label: name }
    })
}

const toSelectOptionObject = (value) => {
    if(typeof value === 'object' && value !== null){
        const name = value.name
        return {value: name, label: name}
    }
    return {value: value, label: value}
}

const timezoneToSelectOptionObject = (timezone) => {
    const name = timezone.name
    return {value: name, label: name + ` (${timezone.offset})`}
}


export default {
    mapSelectOptions,
    mapSelectTimezoneOptions,
    toSelectOptionObject,
    timezoneToSelectOptionObject
};