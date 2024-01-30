import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );

    //para cambiar datos del formulario
    const onChangeTWO = ( value: string, field: keyof T ) => {
        setState({
            ...state,
            [field]: value
        });
        
    }


    const onChangeNumber = (value: string, field: keyof T, validationType?: string) => {
      if ( field === 'telefono' && validationType === 'number' && !/^\d+$/.test(value)) {
        // Validación para números en el campo 'CustBillID' y 'telefono'
        return;
      }
    
      setState({
        ...state,
        [field]: value
      });
    }
    
  

    const onChange = (value: string, field: keyof T, validationType?: string) => {
        // Realizar validaciones según el campo y el tipo de validación
        

        if (field === 'name' && validationType === 'letters' && !/^[A-Za-z\s]*$/.test(value)) {
          // Validación para letras y espacios en el campo 'name'
          return;
        }

        if (field === 'lastName' && validationType === 'letters' && !/^[A-Za-z\s]*$/.test(value)) {
            // Validación para letras y espacios en el campo 'name'
            return;
          }

       

        // Si no hay validaciones o si pasa las validaciones, actualizar el estado
        setState({
        ...state,
        [field]: value
      });
    }

    //en el caso que queramos actualizar todos los valores del formulario
    const setFormValue = ( form: T ) =>{
        setState( form );
    }

    return {
        ...state,
        form: state,
        onChange,
        onChangeNumber,
        setFormValue
    }

}