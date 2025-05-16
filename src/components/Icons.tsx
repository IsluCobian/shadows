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
}
