import { Animated, ImageProps as RNImageProps } from 'react-native';
import { ComponentType } from 'react';

type ImageProps = Omit<RNImageProps, 'style'> & {
  CustomImageComponent?: ComponentType;
  style: any;
};

const Image = ({ CustomImageComponent, ...props }: ImageProps) => {
  const ImageComponent = CustomImageComponent
    ? Animated.createAnimatedComponent(CustomImageComponent)
    : Animated.Image;

  return <ImageComponent {...props} />;
};

export default Image;
