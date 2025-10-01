/* eslint-disable @typescript-eslint/no-explicit-any */
type Source = { src: string; w: number };
import { useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  priority?: boolean;
  sources?: Source[];
  className?: string;
  /** Permite forzar el loading */
  loading?: 'lazy' | 'eager';
  /** Permite pasar srcSet directamente (además de sources) */
  srcSet?: string;
  sizes?: string;
};

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sources = [],
  className,
  loading,
  srcSet: customSrcSet,
  sizes: customSizes,
}: Props) {
  // Si no se pasa `loading`, decide en base a priority
  const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');

  // Construcción automática si se usa `sources`
  const generatedSrcSet = sources.length
    ? sources.map((s) => `${s.src} ${s.w}w`).join(', ')
    : undefined;
  const generatedSizes = sources.length
    ? '(max-width: 768px) 100vw, 1280px'
    : undefined;

  // Decidir qué usar: props directas > generadas
  const finalSrcSet = customSrcSet ?? generatedSrcSet;
  const finalSizes = customSizes ?? generatedSizes;

  useEffect(() => {
    if (!priority) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;

    // si tenemos srcset/sizes, úsalos como atributos "imageSrcset"/"imageSizes"
    if (finalSrcSet) (link as any).imageSrcset = finalSrcSet;
    if (finalSizes) (link as any).imageSizes = finalSizes;

    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [priority, src, finalSrcSet, finalSizes]);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={resolvedLoading}
      decoding="async"
      {...(finalSrcSet ? { srcSet: finalSrcSet, sizes: finalSizes } : {})}
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}
