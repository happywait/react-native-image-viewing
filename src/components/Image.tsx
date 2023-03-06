import { Animated, ImageProps as RNImageProps } from 'react-native';
import { ComponentType } from 'react';
import createAnimatedComponent = Animated.createAnimatedComponent;
import AnimatedProps = Animated.AnimatedProps;

type ImageProps = AnimatedProps<RNImageProps> & {
  CustomImageComponent?: ComponentType;
};

const Image = ({ CustomImageComponent, ...props }: ImageProps) => {
  const ImageComponent = CustomImageComponent
    ? createAnimatedComponent(CustomImageComponent)
    : Animated.Image;

  return <ImageComponent {...props} />;
};

export default Image;
