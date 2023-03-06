/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View, VirtualizedList, Modal, } from 'react-native';
import ImageItem from './components/ImageItem/ImageItem';
import ImageDefaultHeader from './components/ImageDefaultHeader';
import StatusBarManager from './components/StatusBarManager';
import useAnimatedComponents from './hooks/useAnimatedComponents';
import useImageIndexChange from './hooks/useImageIndexChange';
import useRequestClose from './hooks/useRequestClose';
import Image from './components/Image';
const DEFAULT_ANIMATION_TYPE = 'fade';
const DEFAULT_BG_COLOR = '#000';
const DEFAULT_DELAY_LONG_PRESS = 800;
const DEFAULT_DOUBLE_TAP_DELAY = 300;
const SCREEN = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN.width;
function ImageViewing({ images, keyExtractor, imageIndex, visible, onRequestClose, onPress = () => { }, onLongPress = () => { }, onImageIndexChange, animationType = DEFAULT_ANIMATION_TYPE, backgroundColor = DEFAULT_BG_COLOR, presentationStyle, swipeToCloseEnabled, doubleTapToZoomEnabled, delayLongPress = DEFAULT_DELAY_LONG_PRESS, HeaderComponent, FooterComponent, doubleTapDelay = DEFAULT_DOUBLE_TAP_DELAY, withBlurBackground = true, blurRadius = 10, blurOverlayColor, CustomImageComponent, }) {
    const imageList = useRef(null);
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, SCREEN);
    const [headerTransform, footerTransform, toggleBarsVisible] = useAnimatedComponents();
    const blurOverlayStyle = withBlurBackground && blurOverlayColor
        ? { backgroundColor: blurOverlayColor }
        : {};
    useEffect(() => {
        if (onImageIndexChange) {
            onImageIndexChange(currentImageIndex);
        }
    }, [currentImageIndex]);
    const onZoom = useCallback((isScaled) => {
        var _a;
        // @ts-ignore
        (_a = imageList === null || imageList === void 0 ? void 0 : imageList.current) === null || _a === void 0 ? void 0 : _a.setNativeProps({ scrollEnabled: !isScaled });
        toggleBarsVisible(!isScaled);
    }, [imageList]);
    if (!visible) {
        return null;
    }
    return (<Modal transparent={presentationStyle === 'overFullScreen'} visible={visible} presentationStyle={presentationStyle} animationType={animationType} onRequestClose={onRequestCloseEnhanced} supportedOrientations={['portrait']} hardwareAccelerated>
      <StatusBarManager presentationStyle={presentationStyle}/>
      <View style={[styles.container, { opacity, backgroundColor }]}>
        <Animated.View style={[styles.header, { transform: headerTransform }]}>
          {typeof HeaderComponent !== 'undefined' ? (React.createElement(HeaderComponent, {
            imageIndex: currentImageIndex,
        })) : (<ImageDefaultHeader onRequestClose={onRequestCloseEnhanced}/>)}
        </Animated.View>
        <VirtualizedList ref={imageList} data={images} horizontal pagingEnabled windowSize={2} initialNumToRender={1} maxToRenderPerBatch={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} initialScrollIndex={imageIndex} getItem={(_, index) => images[index]} getItemCount={() => images.length} getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
        })} renderItem={({ item: imageSrc }) => (<>
              {withBlurBackground && (<Image source={imageSrc} style={styles.absolute} blurRadius={blurRadius} CustomImageComponent={CustomImageComponent}/>)}
              <View style={blurOverlayStyle}>
                <ImageItem onZoom={onZoom} imageSrc={imageSrc} onRequestClose={onRequestCloseEnhanced} onPress={onPress} onLongPress={onLongPress} delayLongPress={delayLongPress} swipeToCloseEnabled={swipeToCloseEnabled} doubleTapToZoomEnabled={doubleTapToZoomEnabled} doubleTapDelay={doubleTapDelay} CustomImageComponent={CustomImageComponent}/>
              </View>
            </>)} onMomentumScrollEnd={onScroll} 
    //@ts-ignore
    keyExtractor={(imageSrc, index) => keyExtractor
            ? keyExtractor(imageSrc, index)
            : typeof imageSrc === 'number'
                ? `${imageSrc}`
                : imageSrc.uri}/>
        {typeof FooterComponent !== 'undefined' && (<Animated.View style={[styles.footer, { transform: footerTransform }]}>
            {React.createElement(FooterComponent, {
                imageIndex: currentImageIndex,
            })}
          </Animated.View>)}
      </View>
    </Modal>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    header: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        top: 0,
    },
    footer: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        bottom: 0,
    },
});
const EnhancedImageViewing = (props) => (<ImageViewing key={props.imageIndex} {...props}/>);
export default EnhancedImageViewing;