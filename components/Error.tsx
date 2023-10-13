const ValidationError = ({ errors, fieldName } : any) => {
    return (
        errors && (errors.hasOwnProperty(fieldName)) ? (
            <div className="red">{errors[fieldName]}</div>
        ) : null
    );
};

export default ValidationError;