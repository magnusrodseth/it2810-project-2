import { InputHTMLAttributes } from 'react'
import { Input } from 'react-daisyui'

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  label: string
  dataTestId?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, dataTestId, ...props }) => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto space-y-4">
      <label htmlFor={props.id} className="font-bold">{label}</label>
      <Input
        id={props.id}
        type="text"
        color="secondary"
        placeholder={props.placeholder}
        data-testid={dataTestId}
        required
        onChange={props.onChange}
        {...props}
      />
    </div>
  )
}

export default InputField
