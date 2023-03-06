/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { ComponentType } from 'react';
import { ImageProps } from 'react-native';
import { ImageSource } from '../../@types';
type Props = {
    imageSrc: ImageSource;
    onRequestClose: () => void;
    onZoom: (scaled: boolean) => void;
    onLongPress: (image: ImageSource) => void;
    delayLongPress: number;
    swipeToCloseEnabled?: boolean;
    doubleTapToZoomEnabled?: boolean;
    onPress: (image: ImageSource) => void;
    doubleTapDelay: number;
    CustomImageComponent?: ComponentType<ImageProps>;
};
declare const _default: React.MemoExoticComponent<({ imageSrc, onZoom, onRequestClose, onLongPress, delayLongPress, swipeToCloseEnabled, doubleTapToZoomEnabled, onPress, doubleTapDelay, CustomImageComponent, }: Props) => JSX.Element>;
export default _default;
