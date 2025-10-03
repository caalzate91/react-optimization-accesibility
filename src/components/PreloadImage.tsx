import React from 'react';

interface PreloadImageProps {
  src: string;
  className?: string;
  alt?: string;
}

const PreloadImage: React.FC<PreloadImageProps> = ({ src, className, alt = '' }) => {
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      fetchPriority="high"
      decoding="async"
      loading="eager"
    />
  );
};

export default PreloadImage;