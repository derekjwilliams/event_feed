'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MapPin, X } from 'lucide-react'

// Type declarations for User-Agent Client Hints

interface MapLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
  latitude: number
  longitude: number
  accuracy?: number
  label?: string
}

const MapLink = ({
  latitude,
  longitude,
  accuracy,
  children,
  label,
  ...props
}: MapLinkProps) => {
  const [platform, setPlatform] = useState<'ios' | 'macos' | 'other'>('other')
  const [href, setHref] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0,
  })
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const detectPlatform = async () => {
      try {
        // Modern User-Agent Client Hints detection
        if (navigator.userAgentData) {
          const uaData = await navigator.userAgentData.getHighEntropyValues([
            'platform',
            'brands',
          ])

          // Detect macOS
          if (uaData.platform.toLowerCase() === 'macos') {
            setPlatform('macos')
            return
          }

          const isIOS = ['iOS', 'iPhone', 'iPad'].includes(uaData.platform)
          if (isIOS) {
            setPlatform('ios')
            return
          }
        }

        // Fallback to userAgent parsing
        const userAgent = navigator.userAgent
        const isMacDesktop =
          /Macintosh/.test(userAgent) &&
          !/iPhone|iPad|iPod/.test(userAgent) &&
          navigator.maxTouchPoints <= 1

        const isIOSDevice =
          /iPhone|iPad|iPod/.test(userAgent) ||
          (/Macintosh/.test(userAgent) && navigator.maxTouchPoints > 1)

        if (isMacDesktop) {
          setPlatform('macos')
        } else if (isIOSDevice) {
          setPlatform('ios')
        } else {
          setPlatform('other')
        }
      } catch (error) {
        console.error('Platform detection error:', error)
        setPlatform('other')
      }
    }

    const generateMapLink = () => {
      const coords = `${latitude},${longitude}${accuracy ? `±${accuracy}` : ''}`
      switch (platform) {
        case 'ios':
          if (label && label.trim() !== '') {
            return `maps://?q=${label}&addess=${label}&ll=${encodeURIComponent(
              coords
            )}`
          } else {
            return `maps://?q=${encodeURIComponent(
              coords
            )}&ll=${encodeURIComponent(coords)}`
          }
        case 'macos':
          // This is just a fallback, dialog will handle the actual choice
          if (label && label.trim() !== '') {
            return `https://maps.apple.com/?q=${label}&address=${label}&ll=${latitude},${longitude}`
          } else {
            return `https://maps.apple.com/?q=${latitude},${longitude}&ll=${latitude},${longitude}`
          }
        default:
          return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      }
    }

    detectPlatform().then(() => {
      setHref(generateMapLink())
    })
  }, [latitude, longitude, accuracy, platform])

  const handleAppleMaps = () => {
    let newTab
    if (label && label.trim() !== '') {
      newTab = window.open(
        `https://maps.apple.com/?ll=${encodeURIComponent(
          `${coordinates.latitude},${coordinates.longitude}`
        )}&address=${label}&q=${label}`,
        '_self'
      )
    } else {
      newTab = window.open(
        `https://maps.apple.com/?q=${encodeURIComponent(
          `${coordinates.latitude},${coordinates.longitude}`
        )}`,
        '_self'
      )
    }

    if (newTab) {
      setTimeout(() => closeDialog(), 100) // Delay to ensure tab opens properly
    } else {
      closeDialog()
    }
  }

  const handleGoogleMaps = () => {
    // Construct Google Maps URL directly
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`
    window.open(googleUrl, '_blank')
    closeDialog()
  }

  const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setCoordinates({ latitude, longitude })
    dialogRef.current?.showModal()
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    dialogRef.current?.close()
    setIsDialogOpen(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (platform === 'macos') {
      openDialog(e)
    } else if (platform === 'ios') {
      e.preventDefault()
      const webFallback = `https://maps.apple.com/?q=${encodeURIComponent(
        `${latitude},${longitude}`
      )}`
      window.location.href = `maps://?q=${encodeURIComponent(
        `${latitude},${longitude}`
      )}`
      setTimeout(() => {
        if (!document.hidden) window.open(webFallback, '_blank')
      }, 500)
    }
  }

  const getAriaLabel = () => {
    const coordText = `latitude of ${latitude} and longitude of ${longitude}`
    return label ? `Open ${label} at ${coordText}` : `Open map at ${coordText}`
  }

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={getAriaLabel()}
        {...props}
      >
        {children || (
          <MapPin className="text-neutral-500 dark:text-neutral-200 saturate-25" />
        )}
      </Link>
      <dialog
        ref={dialogRef}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 rounded-lg border border-gray-300 shadow-lg bg-neutral-200 dark:bg-neutral-800"
        aria-labelledby="dialog-title"
      >
        <div className="p-2">
          <h2
            id="dialog-title"
            className="px-2 text-lg font-semibold mb-4 text-black dark:text-white"
          >
            Choose Map Application
          </h2>
          <div className="px-4 pb-4">
            <div className="flex gap-4 justify-between">
              <button
                onClick={handleAppleMaps}
                className="cursor-pointer bg-blue-950 dark:bg-amber-300 text-white dark:text-black px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                Apple Maps
              </button>
              <button
                onClick={handleGoogleMaps}
                className="cursor-pointer bg-blue-950 dark:bg-amber-300 text-white dark:text-black px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                Google Maps
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={closeDialog}
          className="absolute top-1 right-1 bg-transparent border-none text-xl cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close dialog"
        >
          <X />
        </button>
      </dialog>
    </>
  )
}

export default MapLink
