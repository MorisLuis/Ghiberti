
import PropTypes from 'prop-types';
import { memo } from 'react';
//import cx from 'classnames';
import Abbr from './Abrr';
import ValidationError from '../Error';


interface Props {
    handleOnChange: any,
    input: any,
    states: any,
    isFetchingStates: any,
    isShipping: any
}

const StateSelection = ({ handleOnChange, input, states, isFetchingStates, isShipping }: Props) => {

    const { state, errors } = input || {};

    const inputId = `state-${isShipping ? 'shipping' : 'billing'}`;

    if (isFetchingStates) {
        // Show loading component.
        return (
            <div className="mb-3">
                <label className="leading-7 text-sm text-gray-700">
                    State/County
                    <Abbr required />
                </label>
                <div className="relative w-full border-none">
                    <select
                        disabled
                        value=""
                        name="state"
                        className="input"
                        >
                        <option value="">Loading...</option>
                    </select>
                </div>
            </div>
        )
    }

    if (!states.length) {
        return null;
    }

    return (
        <div className="mb-3">
            <label className="leading-7 text-sm text-gray-600" htmlFor={inputId}>
                State/County
                <Abbr required />
            </label>
            <div className="relative w-full border-none">
                <select
                    disabled={isFetchingStates}
                    onChange={handleOnChange}
                    value={state}
                    name="state"
                    className="input"

                    id={inputId}
                >
                    <option value="">Select a state...</option>
                    {states.map((state : any, index: number) => (
                        <option key={state?.stateCode ?? index} value={state?.stateName ?? ''}>
                            {state?.stateName}
                        </option>
                    ))}
                </select>
            </div>
            <ValidationError errors={errors} fieldName={'state'} />
        </div>
    )
}

/* StateSelection.propTypes = {
    handleOnChange: PropTypes.func,
    input: PropTypes.object,
    states: PropTypes.array,
    isFetchingStates: PropTypes.bool,
    isShipping: PropTypes.bool
} */

StateSelection.defaultProps = {
    handleOnChange: () => null,
    input: {},
    states: [],
    isFetchingStates: false,
    isShipping: true
}

export default memo(StateSelection);
