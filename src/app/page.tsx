'use client'

import { useEffect, useState } from 'react'
import DesktopPage from './desktop/page'
import MobilePage from './mobile/page'

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const mobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
    setIsMobile(mobile)
  }, [])

  if (isMobile === null) return null

  return isMobile ? <MobilePage /> : <DesktopPage />
}