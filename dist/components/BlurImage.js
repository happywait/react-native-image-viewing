import React, { useState } from 'react';
import { Image } from 'react-native';
// const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedImage = Image;
const BlurImage = ({ blurRadius, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <AnimatedImage
      {...props}
      blurRadius={isLoaded ? blurRadius : 0}
      onLoadEnd={() => setIsLoaded(true)}
    />
  );
};
export default BlurImage;
