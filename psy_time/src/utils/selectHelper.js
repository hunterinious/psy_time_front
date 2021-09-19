const mapSelectOptions = (data) => {
    if(Array.isArray(data)){
        return data.map(v => {
            const name = v.name
            return { value: name, label: name }
        })
    }else if(typeof data === 'object'){
        const name = data.name
        return { value: name, label: name }
    }
}

const valueToSelectOptionObject = (value) => {
    return {value: value, label: value}
}

export default {
    mapSelectOptions,
    valueToSelectOptionObject
};