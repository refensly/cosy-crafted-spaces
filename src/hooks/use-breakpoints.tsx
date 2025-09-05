import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = React.useState<{
    isMobile: boolean | undefined
    isTablet: boolean | undefined
    isDesktop: boolean | undefined
    isIpad: boolean | undefined
  }>({
    isMobile: undefined,
    isTablet: undefined,
    isDesktop: undefined,
    isIpad: undefined
  })

  React.useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height
      
      // Detect iPad specifically (810x1080 or similar portrait orientations)
      const isIpad = (width >= 768 && width <= 820 && height >= 1000) || 
                     (height >= 768 && height <= 820 && width >= 1000)
      
      // Landscape detection for better text scaling
      const isLandscape = aspectRatio >= 1.5 && height <= 800
      
      const isMobile = width < MOBILE_BREAKPOINT && !isIpad
      const isTablet = (width >= MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT) || isIpad || isLandscape
      const isDesktop = width > TABLET_BREAKPOINT && !isIpad && !isLandscape
      
      setBreakpoints({ isMobile, isTablet, isDesktop, isIpad })
    }

    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`)
    mql.addEventListener("change", updateBreakpoints)
    updateBreakpoints()
    
    return () => mql.removeEventListener("change", updateBreakpoints)
  }, [])

  return {
    isMobile: !!breakpoints.isMobile,
    isTablet: !!breakpoints.isTablet,
    isDesktop: !!breakpoints.isDesktop,
    isIpad: !!breakpoints.isIpad,
    isMobileOrTablet: !!(breakpoints.isMobile || breakpoints.isTablet)
  }
}