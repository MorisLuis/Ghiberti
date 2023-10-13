import DOMPurify from 'dompurify';

export const sanitize = ( content ) => {
	return 'undefined' !== typeof window ? DOMPurify.sanitize( content ) : content;
};
