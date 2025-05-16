import { Shadow } from "./ShadowControls"

interface EditableBoxProps {
  styles: {
    borderRadius: {
      topLeft: number
      topRight: number
      bottomRight: number
      bottomLeft: number
    }
    width: number
    height: number
    backgroundColor: string
    shadows: Shadow[]
  }
  classname?: string
}

export default function EditableBox({ styles }: EditableBoxProps) {
  const boxShadow = styles.shadows
    .filter((s) => s.visible !== false)
    .map(
      (s) =>
        `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
    )
    .join(", ")

  return (
    <div
      style={{
        borderTopLeftRadius: styles.borderRadius.topLeft,
        borderTopRightRadius: styles.borderRadius.topRight,
        borderBottomRightRadius: styles.borderRadius.bottomRight,
        borderBottomLeftRadius: styles.borderRadius.bottomLeft,
        width: styles.width,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
        boxShadow: boxShadow,
        padding: 12,
      }}
    />
  )
}
