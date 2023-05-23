/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { Animated, Modal, StyleSheet, View, VirtualizedList, } from 'react-native';
import ImageDefaultHeader from './components/ImageDefaultHeader';
import ImageItem from './components/ImageItem/ImageItem';
import StatusBarManager from './components/StatusBarManager';
import useAnimatedComponents from './hooks/useAnimatedComponents';
import useImageIndexChange from './hooks/useImageIndexChange';
import useRequestClose from './hooks/useRequestClose';
const DEFAULT_ANIMATION_TYPE = 'fade';
const DEFAULT_BG_COLOR = '#000';
const DEFAULT_DELAY_LONG_PRESS = 800;
const DEFAULT_DOUBLE_TAP_DELAY = 300;
function ImageViewing({ images, keyExtractor, imageIndex, visible, onRequestClose, onPress = () => { }, onLongPress = () => { }, onImageIndexChange, animationType = DEFAULT_ANIMATION_TYPE, backgroundColor = DEFAULT_BG_COLOR, presentationStyle, swipeToCloseEnabled, doubleTapToZoomEnabled, delayLongPress = DEFAULT_DELAY_LONG_PRESS, HeaderComponent, FooterComponent, doubleTapDelay = DEFAULT_DOUBLE_TAP_DELAY, withBlurBackground = true, blurRadius = 10, blurOverlayColor, imageProps, supportedOrientations = ['portrait'], }) {
    const imageList = useRef(null);
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, layout);
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
    return (<Modal transparent={presentationStyle === 'overFullScreen'} visible={visible} presentationStyle={presentationStyle} animationType={animationType} onRequestClose={onRequestCloseEnhanced} supportedOrientations={supportedOrientations} hardwareAccelerated>
      <StatusBarManager presentationStyle={presentationStyle}/>
      <View style={[styles.container, { opacity, backgroundColor }]} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
        <Animated.View style={[styles.header, { transform: headerTransform }]}>
          {typeof HeaderComponent !== 'undefined' ? (React.createElement(HeaderComponent, {
            imageIndex: currentImageIndex,
        })) : (<ImageDefaultHeader onRequestClose={onRequestCloseEnhanced}/>)}
        </Animated.View>
        <VirtualizedList ref={imageList} data={images} horizontal pagingEnabled windowSize={2} initialNumToRender={1} maxToRenderPerBatch={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} initialScrollIndex={imageIndex} getItem={(_, index) => images[index]} getItemCount={() => images.length} getItemLayout={(_, index) => ({
            length: layout.width,
            offset: layout.width * index,
            index,
        })} renderItem={({ item: imageSrc }) => {
            return (<View>
                {withBlurBackground && (<Image {...imageProps} source={imageSrc} style={styles.absolute} blurRadius={blurRadius}/>)}
                <View style={blurOverlayStyle}>
                  <ImageItem onZoom={onZoom} imageSrc={imageSrc} onRequestClose={onRequestCloseEnhanced} onPress={onPress} onLongPress={onLongPress} delayLongPress={delayLongPress} swipeToCloseEnabled={swipeToCloseEnabled} doubleTapToZoomEnabled={doubleTapToZoomEnabled} doubleTapDelay={doubleTapDelay} imageProps={imageProps} layout={layout}/>
                </View>
              </View>);
        }} onMomentumScrollEnd={onScroll} 
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
