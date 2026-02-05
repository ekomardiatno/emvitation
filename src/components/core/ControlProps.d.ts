import { Control, FieldValue } from "react-hook-form"

export default interface ControlProps {
  label?: string
  placeholder?: string
  name: string
  control: Control<FieldValue, any, FieldValue>
  required?: boolean
  defaultValue?: string
  editable?: boolean
}