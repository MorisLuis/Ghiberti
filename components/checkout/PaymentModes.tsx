import ValidationError from "../Error";

interface Props {
    input: any;
    handleOnChange: (event: any, isShipping?: boolean, isBillingOrShipping?: boolean) => Promise<void>;
}

const PaymentModes = ({ input, handleOnChange }: Props) => {

    const { errors, paymentMethod } = input || {}

    return (
        <div className="mt-3" style={{ padding: "2em 0em"}}>
            <ValidationError errors={errors} fieldName={'paymentMethod'} />

            {/*Pay with Stripe*/}
            <div className="form-check woo-next-payment-input-container mt-2">
                <label className="form-check-label">
                    <input onChange={handleOnChange} value="cod" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'cod' === paymentMethod} />
                    <span className="woo-next-payment-content">Contra reembolso</span>
                </label>
            </div>

            <div className="form-check woo-next-payment-input-container mt-2">
                <label className="form-check-label">
                    <input onChange={handleOnChange} value="stripe" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'stripe' === paymentMethod} />
                    <span className="woo-next-payment-content">Stripe</span>
                </label>
            </div>

        </div>
    );
};

export default PaymentModes;
