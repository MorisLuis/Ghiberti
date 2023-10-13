import PropTypes from 'prop-types';

interface props {
    required: boolean
}

const Abbr = ({ required }: props) => {
    if (!required) {
        return null;
    }

    return <abbr className='red' style={{ textDecoration: 'none' }} title="required">*</abbr>
}

Abbr.defaultProps = {
    required: false
}

export default Abbr
