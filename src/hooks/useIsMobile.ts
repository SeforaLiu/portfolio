import { useEffect, useState } from 'react'

/**
 * Hook to detect if the current device is a mobile device
 * @returns boolean indicating if the device is mobile (width <= 768px)
 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // Initial check
    return typeof window !== 'undefined' && window.innerWidth <= 768
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

export default useIsMobile
