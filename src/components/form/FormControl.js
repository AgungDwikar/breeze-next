import React from 'react'
import PropTypes from 'prop-types'

const FormControl = ({ children, label, id }) => {
    return (
        <div className="mb-6">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
            {children}
        </div>
    )
}

FormControl.propTypes = {}

export default FormControl
