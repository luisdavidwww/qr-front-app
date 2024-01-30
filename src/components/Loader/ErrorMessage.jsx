import React from 'react'

const ErrorMessage = () => {
  return (
    <div>
        <div className='category__products'>
            <div className='container__error'>
                <div className="alert alert-danger" style={{textAlign:'center', width:'300px'}}>
                    Error al cargar componente
                </div>
            </div>
        </div>
    </div>
  )
}

export default ErrorMessage;