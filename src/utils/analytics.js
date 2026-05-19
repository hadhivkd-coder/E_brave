// src/utils/analytics.js
// Website Intelligence Integration — Loads analytics SDKs dynamically based on env configuration

export const initAnalytics = () => {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;

  // 1. Google Analytics
  if (gaId && gaId !== 'G-XXXXXXXXXX') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId, { page_path: window.location.pathname });
    window.gtag = gtag;
    console.log('[Analytics] Google Analytics initialized.');
  }

  // 2. Microsoft Clarity
  if (clarityId && clarityId !== 'xxxxxxxxxx') {
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityId);
    console.log('[Analytics] Microsoft Clarity initialized.');
  }

  // 3. Meta Pixel
  if (pixelId && pixelId !== 'xxxxxxxxxxxxxxx') {
    (function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)})(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    console.log('[Analytics] Meta Pixel initialized.');
  }
};

export const trackEvent = (name, params = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', name, params);
  }
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', name, params);
  }
};
