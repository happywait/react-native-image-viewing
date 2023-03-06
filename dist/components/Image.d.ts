import { ImageProps as RNImageProps } from 'react-native';
import { ComponentType } from 'react';
type ImageProps = Omit<RNImageProps, 'style'> & {
    CustomImageComponent?: ComponentType;
    style: any;
};
declare const Image: ({ CustomImageComponent, ...props }: ImageProps) => JSX.Element;
export default Image;
