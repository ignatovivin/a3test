/**
 * 24/Business/Outline/qr — для пункта меню «Платежный виджет»
 */
export function QrIcon({ className, ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M2 2H9V9H2V2ZM3 3H8V8H3V3Z" fill="currentColor" />
      <path d="M2 11H4V13H2V11Z" fill="currentColor" />
      <path d="M16 11V13H18V15H20V13H22V11H20V13H18V11H16Z" fill="currentColor" />
      <path d="M18 20H20V22H18V20Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 15V22H9V15H2ZM8 16H3V21H8V16Z" fill="currentColor" />
      <path d="M7 12.5H11.5V15H12.5V11.5H7V12.5Z" fill="currentColor" />
      <path d="M16 18.5V15.5H17V19.5H12.5V22H11.5V18.5H16Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15 2H22V9H15V2ZM16 3H21V8H16V3Z" fill="currentColor" />
      <path d="M11.5 9V2H12.5V9H11.5Z" fill="currentColor" />
      <path d="M20.5 15.5V19.5H21.5V15.5H20.5Z" fill="currentColor" />
    </svg>
  )
}
