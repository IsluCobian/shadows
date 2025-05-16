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
  }
  classname?: string
}

export default function EditableBox({ styles }: EditableBoxProps) {
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
        padding: 12,
      }}
    />
  )
}
