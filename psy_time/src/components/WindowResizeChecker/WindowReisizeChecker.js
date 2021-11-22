import {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as layoutSizes from '../../consts/layout/layoutSizes';
import * as layoutTypes from '../../consts/layout/layoutTypes';
import useWindowResize from '../../hooks/useWindowResize';
import {setLayout} from '../../redux/app-reducer'


const WindowResizeChecker = (props) => {
    const {layoutType, dispatch} = props;
    const getSize = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [windowSize, setWindowSize] = useState(getSize());
    const onResize = () => setWindowSize(getSize());

    useWindowResize(onResize);

    const currentLayout = getLayout(windowSize.width);

    useEffect(() => {
        if (layoutType !== currentLayout) {
            dispatch(setLayout(currentLayout));
        }
    }, [layoutType, currentLayout]);

    return null;
};

const getLayout = (deviceWidth) => {
    if (deviceWidth <= layoutSizes.MOBILE) {
        return layoutTypes.MOBILE;
    } else if (deviceWidth >= layoutSizes.DESKTOP) {
        return layoutTypes.DESKTOP;
    } else {
        return layoutTypes.TABLET;
    }
};

const mapStateToProps = (state) => {
    return {
        layoutType: state.app.layoutType
    }
}

export default connect(mapStateToProps)(WindowResizeChecker);
