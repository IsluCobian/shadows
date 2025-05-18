type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  Corner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 21v-9a9 9 0 0 1 9-9h11" />
    </svg>
  ),
  BoxStudio: (props: IconProps) => (
    <svg
      viewBox="0 0 128 128"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M105 18C107.761 18 110 20.2386 110 23V105C110 107.761 107.761 110 105 110H23C20.2386 110 18 107.761 18 105V23C18 20.2386 20.2386 18 23 18H105ZM36 31C33.2386 31 31 33.2386 31 36V92C31 94.7614 33.2386 97 36 97H92C94.7614 97 97 94.7614 97 92V36C97 33.2386 94.7614 31 92 31H36Z" />
      <rect x="43" y="43" width="42" height="42" rx="3" />
    </svg>
  ),
}
