import { SVGProps, forwardRef } from 'react';

export const TikTokIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.2 10.9v2.83A6.258 6.258 0 012 19.82h2.1a4.237 4.237 0 004.24-4.24v-2.83a6.258 6.258 0 016.26-6.26h2.1v-2.1h-2.1v2.1" />
  </svg>
));

TikTokIcon.displayName = 'TikTokIcon';
