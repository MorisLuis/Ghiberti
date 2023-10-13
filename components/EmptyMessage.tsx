import React from 'react';
import styles from '../styles/Ui.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons';

const EmptyMessage = ({ children }: any) => {
    return (
        <div className={styles.emptyMessage}>
            <FontAwesomeIcon icon={faFaceMeh} className={`icon__small`} />
            <div className={styles.text}>
                {children}
            </div>
        </div>
    )
}

export default EmptyMessage
