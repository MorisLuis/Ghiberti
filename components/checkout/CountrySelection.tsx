/* import Error from './error';
import { isEmpty, map } from "lodash";
import Abbr from "./form-elements/abbr";
import ArrowDown from "../icons/ArrowDown"; */
import { isEmpty, map } from "lodash";
import ValidationError from "../Error";
import Abbr from "./Abrr";

interface props {
    input: any;
    countries: any;
    isShipping: boolean;

    //Methods
    handleOnChange: (arg1: any) => void;
}

const CountrySelection = ({ input, handleOnChange, countries, isShipping } : props) => {

	const { country, errors } = input || {};

	const inputId = `country-${isShipping ? 'shipping' : 'billing'}`;

	return (
		<div className="mb-3">
			<label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
				Country
				<Abbr required />
			</label>
			<div className="relative w-full border-none">
				<select
					onChange={handleOnChange}
					value={country}
					name="country"
					className="input"
					id={inputId}
				>
					<option value="">Select a country...</option>
					{!isEmpty(countries) &&
						map(countries, (country : any) => (
							<option key={country?.countryCode} data-countrycode={country?.countryCode}
								value={country?.countryCode}>
								{country?.countryName}
							</option>
						))}
				</select>
				<span className="absolute right-0 mr-1 text-gray-500" style={{ top: '25%' }}>
					{/* <ArrowDown width={24} height={24} className="fill-current" /> */}
                    
				</span>
			</div>
			<ValidationError errors={errors} fieldName={'country'} />
		</div>
	);
}

export default CountrySelection;
