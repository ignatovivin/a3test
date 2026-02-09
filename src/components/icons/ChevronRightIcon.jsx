/**
 * Шеврон вправо — для кнопок фильтра «Все» в блоках банков и услуг
 */
export function ChevronRightIcon({ className, ...props }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M15.7559 11.6387C15.9477 11.8412 15.9477 12.1588 15.7559 12.3613L9.00586 19.4863C8.80642 19.6966 8.47407 19.7052 8.26367 19.5059C8.05345 19.3064 8.04481 18.9741 8.24414 18.7637L14.6523 12L8.24414 5.23633C8.04481 5.02593 8.05345 4.69358 8.26367 4.49414C8.47407 4.29481 8.80642 4.30345 9.00586 4.51367L15.7559 11.6387Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
    </svg>
  )
}
