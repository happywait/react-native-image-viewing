import { Animated, ImageProps as RNImageProps } from 'react-native';
import { ComponentType } from 'react';

type ImageProps = Omit<RNImageProps, 'style'> & {
  CustomImageComponent?: ComponentType<RNImageProps>;
  style: any;
};

const Image = ({ CustomImageComponent, ...props }: ImageProps) => {
  const ImageComponent = CustomImageComponent ?? Animated.Image;

  return <ImageComponent {...props} />;
};

export default Image;
