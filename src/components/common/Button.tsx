import React, { ReactNode } from 'react'
import { Button as DaisyButton } from 'react-daisyui'
import { ButtonProps as DaisyButtonProps } from 'react-daisyui/dist/Button'
import classNames from '../../utils/common/classNames'

interface ButtonProps extends DaisyButtonProps {
  children: ReactNode
  onClick?: () => void
  dataTestId?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color, className, dataTestId }) => {
  const style = className || ''

  return (
    <DaisyButton
      onClick={onClick}
      className={classNames('py-2 px-4', style)}
      color={color}
      data-testid={dataTestId}
    >
      {children}
    </DaisyButton>
  )
}

export default Button
