import trashbin from './trashbin.png';
import logo from '../../assets/logo.png';
import styles from './DeleteItem.module.css';

export const DeleteItem =({onDelete, onLeave}) => {
    const onYes = () => {
        onDelete();  
        onLeave();  
    };

    return (
        <div 
            className={styles.deleteItemWrapper}
            role="dialog" 
        >
            <div className={styles.deleteItemModal}>
                <img src={logo} width='200px' alt='logo Spark Travel'/>
                <img src={trashbin} width='80px' alt='trashbin pictogram'/>
                <p>Are you sure do you want to delete the hotel from list?</p>

                <div className={styles.deleteButtons}>                    
                    <button 
                        className={styles.deleteButton} 
                        onClick={onYes}
                        aria-label="Yes, delete the hotel"
                    >
                    Yes
                    </button>
                    <button 
                        className={styles.deleteButton} 
                        onClick={onLeave}
                        aria-label="No, keep the hotel"
                    >
                    No
                    </button>
                </div>
            </div>
        </div>
    );
};