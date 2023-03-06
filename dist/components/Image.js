import { Animated } from 'react-native';
const Image = ({ CustomImageComponent, ...props }) => {
    const ImageComponent = CustomImageComponent !== null && CustomImageComponent !== void 0 ? CustomImageComponent : Animated.Image;
    return <ImageComponent {...props}/>;
};
export default Image;
