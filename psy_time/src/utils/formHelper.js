import commonHelper from './commonHelper';

const areValuesChanged = (values, initialValues) => {
    return !commonHelper.deepEqual(values, initialValues)
}

export default {
    areValuesChanged
}