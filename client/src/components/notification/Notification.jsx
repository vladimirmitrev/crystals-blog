import { useContext } from 'react';

import './Notification.module.css';
import { NotificationContext } from '../../contexts/NotificationContext';


const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);
    console.log(notification.message)

    return (
        <div className={`notification ${notification.type}`} onClick={ hideNotification }>
            <p className="notification-message">
                
                { notification.message }
                { notification.message !== ''
                    ? <span className="notification-close">&#10799;</span>
                    : 'НЯМА ГРЕШКА' }
            </p>
        </div>
    );
}

export default Notification;