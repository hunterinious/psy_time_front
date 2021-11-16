const choosenCriteriaOnlyNames = (data) => {
    let choosenCriteriaOnlyNames = {}
    for (const [key, value] of Object.entries(data)){
        choosenCriteriaOnlyNames[key] = value.map(v => { 
            if(key === "ages"){
                return v
            }
            return v[1]
        })
    }
    return  choosenCriteriaOnlyNames
}

export default {
    choosenCriteriaOnlyNames
}