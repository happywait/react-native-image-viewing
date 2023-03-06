import React, { useEffect, useState } from 'react';
import { Animated, Image, ImageProps } from 'react-native';

// const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedImage = Image;

const BlurImage = ({ blurRadius, ...props }: ImageProps) => {
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
