import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.alert}>
                <p>{message}</p>
                <div className={styles.buttonContainer}>
                    <button onClick={onConfirm} className={styles.confirmButton}>네</button>
                    {onCancel && <button onClick={onCancel} className={styles.cancelButton}>아니오</button>}
                </div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};

export default Alert;
