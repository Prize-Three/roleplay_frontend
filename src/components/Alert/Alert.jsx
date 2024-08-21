import React from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const renderButtonContent = (text, outlineClass) => (
    <svg className={styles.svgText} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
        <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={outlineClass}
            strokeLinejoin="round"
        >
            {text}
        </text>
        <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className={styles.textMain}
        >
            {text}
        </text>
    </svg>
);

const Alert = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.alert}>
                <div className={styles.alertPositionBox}>
                    {renderButtonContent(message, styles.textOutline)}
                    <div className={styles.buttonContainer}>
                        <button onClick={onConfirm} className={styles.confirmButton}>네</button>
                        {onCancel && <button onClick={onCancel} className={styles.cancelButton}>아니오</button>}
                    </div>
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