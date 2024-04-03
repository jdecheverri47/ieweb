'use client'
import Input from '@mui/joy/Input';
import { useFormContext, Controller } from 'react-hook-form';

function InputBox({ label, type, indicator, htmlFor, rules  }) {
  const { control } = useFormContext();
  return (
    <div className='flex flex-col my-2'>
      <label 
        htmlFor={htmlFor}
        className='text-black text-sm font-medium'
        >
          {label}
      </label>

      <Controller
        name={indicator}
        control={control}
        defaultValue=''
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            className='w-[80vw] py-2 text-lg max-w-[500px]'
            sx={{
              '--Input-focusedHighlight': 'rgba(253, 224, 70, 100)'
            }}
            />
        )}
      />
    </div>
  )
}

export default InputBox