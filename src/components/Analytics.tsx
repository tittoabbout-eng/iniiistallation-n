
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function Analytics() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

    if (!measurementId) {
      return
    }

    if (document.querySelector(`script[data-gtag-script="${measurementId}"]`)) {
      return
    }

    const externalScript = document.createElement('script')
    externalScript.async = true
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    externalScript.dataset.gtagScript = measurementId

    const inlineScript = document.createElement('script')
    inlineScript.dataset.gtagInit = measurementId
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `

    document.head.append(externalScript, inlineScript)
  }, [])

  return null
}
