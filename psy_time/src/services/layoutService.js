import * as layoutTypes from '../consts/layout/layoutTypes';

const isDesktopLayout = (layout) => {console.log(layout, layoutTypes.DESKTOP,layout === layoutTypes.DESKTOP); return layout === layoutTypes.DESKTOP}

const isMobileLayout = (layout) => layout === layoutTypes.MOBILE;

const isTabletLayout = (layout) => layout === layoutTypes.TABLET;

export default {
    isDesktopLayout,
    isMobileLayout,
    isTabletLayout,
};
