import PropTypes from 'prop-types';

interface props {
    required: boolean
}

const Abbr = ({ required }: props) => {
    if (!required) {
        return null;
    }

    return <abbr className="text-red-500" style={{ textDecoration: 'none' }} title="required">*</abbr>
}

/* Abbr.propTypes = {
    required: PropTypes.boolean
} */

Abbr.defaultProps = {
    required: false
}

export default Abbr
