import React, { ChangeEvent } from 'react'
import { Option, Contributor } from '../../types/charts'

interface SelectProps {
  label: string
  options: Option[]
  selected?: Contributor
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({ label, options, onChange, selected }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <select
        className="select select-bordered"
        value={selected == undefined ? 'default' : selected}
        onChange={onChange}>
        <option disabled value="default">
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
