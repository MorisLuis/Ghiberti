const ValidationError = ({ errors, fieldName } : any) => {
    return (
        errors && (errors.hasOwnProperty(fieldName)) ? (
            <div className="invalid-feedback d-block text-red-500">{errors[fieldName]}</div>
        ) : null // Cambié '' a null para evitar el error
    );
};

export default ValidationError;