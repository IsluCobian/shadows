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
    shadow: Shadow
  }
  classname?: string
}

export default function EditableBox({ styles }: EditableBoxProps) {
  const boxShadow = `${styles.shadow.offsetX}px ${styles.shadow.offsetY}px ${styles.shadow.blur}px ${styles.shadow.spread}px ${styles.shadow.color}`
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
