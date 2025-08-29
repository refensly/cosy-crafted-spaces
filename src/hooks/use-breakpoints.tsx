import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = React.useState<{
    isMobile: boolean | undefined
    isTablet: boolean | undefined
    isDesktop: boolean | undefined
  }>({
    isMobile: undefined,
    isTablet: undefined,
    isDesktop: undefined
  })

  React.useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT
      const isDesktop = width > TABLET_BREAKPOINT
      
      setBreakpoints({ isMobile, isTablet, isDesktop })
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
    isMobileOrTablet: !!(breakpoints.isMobile || breakpoints.isTablet)
  }
}