const inputs = [
  {
    label: 'Nombre',
    type: 'text',
    indicator: 'name',
    field: 'name',
    rules: {
      required: 'Este campo es requerido',
      maxLength: {
        value: 30,
        message: 'El nombre no puede ser mayor a 30 caracteres'
      }
    }
  },
  {
    label: 'Email',
    type: 'email',
    indicator: 'email',
    field: 'email'
  },
  {
    label: 'Celular',
    type: 'tel',
    indicator: 'phone',
    field: 'phone'
  },
  {
    label: 'Ciudad',
    type: 'text',
    indicator: 'city',
    field: 'city'
  },
  {
    label: 'Empresa',
    type: 'text',
    indicator: 'company',
    field: 'company'
  },
  {
    label: 'Cargo',
    type: 'text',
    indicator: 'position',
    field: 'position'
  }
]

export default inputs;