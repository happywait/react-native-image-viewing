/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View, TouchableWithoutFeedback, } from 'react-native';
import useDoubleTapToZoom from '../../hooks/useDoubleTapToZoom';
import useImageDimensions from '../../hooks/useImageDimensions';
import { getImageStyles, getImageTransform } from '../../utils';
import { ImageLoading } from './ImageLoading';
import Image from '../Image';
const SWIPE_CLOSE_OFFSET = 75;
const SWIPE_CLOSE_VELOCITY = 1.55;
const SCREEN = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN.width;
const SCREEN_HEIGHT = SCREEN.height;
const ImageItem = ({ imageSrc, onZoom, onRequestClose, onLongPress, delayLongPress, swipeToCloseEnabled = true, doubleTapToZoomEnabled = true, onPress, doubleTapDelay, CustomImageComponent, }) => {
    const scrollViewRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [scaled, setScaled] = useState(false);
    const imageDimensions = useImageDimensions(imageSrc);
    const handleDoubleTap = useDoubleTapToZoom({
        scrollViewRef,
        scaled,
        screen: SCREEN,
        onPress: () => onPress(imageSrc),
        doubleTapToZoomEnabled,
        doubleTapDelay,
    });
    const [translate, scale] = getImageTransform(imageDimensions, SCREEN);
    const scrollValueY = new Animated.Value(0);
    const scaleValue = new Animated.Value(scale || 1);
    const translateValue = new Animated.ValueXY(translate);
    const maxScale = scale && scale > 0 ? Math.max(1 / scale, 1) : 1;
    const imageOpacity = scrollValueY.interpolate({
        inputRange: [-SWIPE_CLOSE_OFFSET, 0, SWIPE_CLOSE_OFFSET],
        outputRange: [0.5, 1, 0.5],
    });
    const imagesStyles = getImageStyles(imageDimensions, translateValue, scaleValue);
    const imageStylesWithOpacity = { ...imagesStyles, opacity: imageOpacity };
    const onScrollEndDrag = useCallback(({ nativeEvent }) => {
        var _a, _b;
        const velocityY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.velocity) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        const scaled = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.zoomScale) > 1;
        onZoom(scaled);
        setScaled(scaled);
        if (!scaled &&
            swipeToCloseEnabled &&
            Math.abs(velocityY) > SWIPE_CLOSE_VELOCITY) {
            onRequestClose();
        }
    }, [scaled]);
    const onScroll = ({ nativeEvent, }) => {
        var _a, _b;
        const offsetY = (_b = (_a = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.contentOffset) === null || _a === void 0 ? void 0 : _a.y) !== null && _b !== void 0 ? _b : 0;
        if ((nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.zoomScale) > 1) {
            return;
        }
        scrollValueY.setValue(offsetY);
    };
    const onLongPressHandler = useCallback((event) => {
        onLongPress(imageSrc);
    }, [imageSrc, onLongPress]);
    return (<View>
      <ScrollView ref={scrollViewRef} style={styles.listItem} pinchGestureEnabled showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} maximumZoomScale={maxScale} contentContainerStyle={styles.imageScrollContainer} scrollEnabled={swipeToCloseEnabled} onScrollEndDrag={onScrollEndDrag} scrollEventThrottle={1} {...(swipeToCloseEnabled && {
        onScroll,
    })}>
        {(!loaded || !imageDimensions) && <ImageLoading />}
        <TouchableWithoutFeedback onPress={doubleTapToZoomEnabled ? handleDoubleTap : undefined} onLongPress={onLongPressHandler} delayLongPress={delayLongPress}>
          <Image source={imageSrc} style={imageStylesWithOpacity} onLoad={() => setLoaded(true)} CustomImageComponent={CustomImageComponent}/>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>);
};
const styles = StyleSheet.create({
    listItem: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    imageScrollContainer: {
        height: SCREEN_HEIGHT,
    },
});
export default React.memo(ImageItem);