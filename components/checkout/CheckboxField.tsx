import PropTypes from 'prop-types';

interface Props {
    checked: boolean;
    name: string;
    label: string;
    placeholder: string;
    containerClassNames?: string;
    type: string;

    //Methods
    handleOnChange: (event: any, isShipping?: boolean, isBillingOrShipping?: boolean) => Promise<void>;
}

const CheckboxField = ({ 
    handleOnChange,
    checked,
    name,
    label,
    placeholder,
    containerClassNames,
    type
}: Props) => {

    return (
        <div className={containerClassNames}>
            <label className="leading-7 text-md text-gray-700 flex items-center cursor-pointer" htmlFor={name}>
                <input
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    type="checkbox"
                    checked={checked}
                    name={name}
                    id={name}
                    style={{backgroundColor: "white", marginRight:"1em"}}
                />
                <span className="ml-2">{label || ''}</span>
            </label>
        </div>
    )
}

/* CheckboxField.propTypes = {
    handleOnChange: PropTypes.func,
    checked: PropTypes.bool,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    containerClassNames: PropTypes.string
} */

CheckboxField.defaultProps = {
    handleOnChange: () => null,
    checked: false,
    name: '',
    label: '',
    placeholder: '',
    errors: {},
    containerClassNames: ''
}

export default CheckboxField;
