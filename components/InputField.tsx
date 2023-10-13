import PropTypes from 'prop-types';
import Abbr from './checkout/Abrr';
import ValidationError from './Error';

interface inputInterface {
    name: string;
    label: string;
    type: string;
    placeholder: string;

    inputValue: any;
    errors: any;
    required: boolean;
    containerClassNames: string;
    isShipping: boolean;

    //Methods
    handleOnChange:  (arg1: any) => void;
}

const InputField = ({
    handleOnChange,
    inputValue,
    name,
    type,
    label,
    errors,
    placeholder,
    required,
    containerClassNames,
    isShipping
}: inputInterface) => {

    const inputId = `${name}-${isShipping ? 'shipping' : ''}`;

    return (
        <div className={containerClassNames}>
            <label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
                {label || ''}
                <Abbr required={required} />
            </label>
            <input
                onChange={handleOnChange}
                value={inputValue}
                placeholder={placeholder}
                type={type}
                name={name}
                className="input"
                id={inputId}
            />
            <ValidationError errors={errors} fieldName={name} />
        </div>
    )
}

InputField.propTypes = {
    handleOnChange: PropTypes.func,
    inputValue: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
    required: PropTypes.bool,
    containerClassNames: PropTypes.string
}

InputField.defaultProps = {
    handleOnChange: () => null,
    inputValue: '',
    name: '',
    type: 'text',
    label: '',
    placeholder: '',
    errors: {},
    required: false,
    containerClassNames: ''
}

export default InputField;
