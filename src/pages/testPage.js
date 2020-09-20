import React from 'react';
import { showNotification } from '../UI/notificationToast';
import { SUCCESS } from '../utils/consts/notificationTypes';

const Test = () => {
    return (
        <button
            onClick={()=>showNotification('Test',SUCCESS)}
        >
            Notify!
        </button>
    );
}

export default Test;