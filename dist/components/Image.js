import { Animated } from 'react-native';
const Image = ({ CustomImageComponent, ...props }) => {
    const ImageComponent = CustomImageComponent
        ? Animated.createAnimatedComponent(CustomImageComponent)
        : Animated.Image;
    return <ImageComponent {...props}/>;
};
export default Image;
