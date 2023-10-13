import PropTypes from 'prop-types';
import InputField from '../InputField';
import CountrySelection from './CountrySelection';
import StatesSelection from './StatesSelection';
import styles from '../../styles/Checkout.module.scss';

interface Address {
    states: any,
    countries: any,
    input: any,
    handleOnChange: (arg1 : any) => void,
    isFetchingStates: any,
    isShipping: boolean,
    isBillingOrShipping: boolean
}

const Address = ({
    states,
    countries,
    input,
    handleOnChange,
    isFetchingStates,
    isShipping,
    isBillingOrShipping
}: Address) => {

    const { errors } = input || {};

    return (
        <div className={styles.address}>
            <div className={styles.double}>
                <InputField
                    name="firstName"
                    inputValue={input?.firstName}
                    required
                    label="Nombre(s)"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                    handleOnChange={handleOnChange}
                />
                <InputField
                    name="lastName"
                    inputValue={input?.lastName}
                    required
                    handleOnChange={handleOnChange}
                    label="Apellido(s)"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
            </div>
            <InputField
                name="company"
                inputValue={input?.company}
                handleOnChange={handleOnChange}
                label="Nombre Empresa (Opcional)"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
            {/* Country Selection*/}
            <CountrySelection
                input={input}
                handleOnChange={handleOnChange}
                countries={countries}
                isShipping={isShipping}
            />
            <InputField
                name="address1"
                inputValue={input?.address1}
                required
                handleOnChange={handleOnChange}
                label="Calle"
                placeholder="House number and street name"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
            <InputField
                name="address2"
                inputValue={input?.address2}
                handleOnChange={handleOnChange}
                label="Calle 2"
                placeholder="Apartment floor unit building floor etc(optional)"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
            <InputField
                name="city"
                required
                inputValue={input?.city}
                handleOnChange={handleOnChange}
                label="Ciudad"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
            {/* State */}
            <StatesSelection
                input={input}
                handleOnChange={handleOnChange}
                states={states}
                isShipping={isShipping}
                isFetchingStates={isFetchingStates}
            />
            <div className={styles.double}>
                <InputField
                    name="postcode"
                    inputValue={input?.postcode}
                    required
                    handleOnChange={handleOnChange}
                    label="Codigo Postal"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
                <InputField
                    name="phone"
                    inputValue={input?.phone}
                    required
                    handleOnChange={handleOnChange}
                    label="Telefono"
                    errors={errors}
                    isShipping={isShipping}
                    containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
            </div>
            <InputField
                name="email"
                type="email"
                inputValue={input?.email}
                required
                handleOnChange={handleOnChange}
                label="Correo electronico"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="mb-4"
            />
        </div>
    );
};

Address.propTypes = {
    input: PropTypes.object,
    countries: PropTypes.array,
    handleOnChange: PropTypes.func,
    isFetchingStates: PropTypes.bool,
    isShipping: PropTypes.bool
}

Address.defaultProps = {
    input: {},
    countries: [],
    handleOnChange: () => null,
    isFetchingStates: false,
    isShipping: false
}

export default Address;
