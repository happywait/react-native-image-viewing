import { Animated } from 'react-native';
var createAnimatedComponent = Animated.createAnimatedComponent;
const Image = ({ CustomImageComponent, ...props }) => {
    const ImageComponent = CustomImageComponent
        ? createAnimatedComponent(CustomImageComponent)
        : Animated.Image;
    return <ImageComponent {...props}/>;
};
export default Image;
