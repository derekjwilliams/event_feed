// components/LazyImage.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
  sizes?: string
  quality?: number
  unloadDelay?: number
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 192,
  height = 192,
  className = 'w-32 h-32 @[480px]:w-48 @[480px]:h-48',
  style,
  sizes,
  quality = 75,
  unloadDelay = 1000, // Default 1-second delay
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Intersection Observer for visibility tracking
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Delay unload logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isVisible) {
      // Immediately render when becoming visible
      setShouldRender(true)
    } else {
      // Delay unrender when leaving viewport
      timeoutId = setTimeout(() => {
        setShouldRender(false)
      }, unloadDelay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isVisible, unloadDelay])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      {shouldRender ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          sizes={sizes}
          className="object-cover w-full h-full"
          onLoadingComplete={() => {
            // Optional: Track when image is fully loaded
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default LazyImage
