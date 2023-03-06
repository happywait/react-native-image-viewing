import { Animated, ImageProps as RNImageProps } from 'react-native';
import { ComponentType } from 'react';
import AnimatedProps = Animated.AnimatedProps;
type ImageProps = AnimatedProps<RNImageProps> & {
    CustomImageComponent?: ComponentType;
};
declare const Image: ({ CustomImageComponent, ...props }: ImageProps) => JSX.Element;
export default Image;
