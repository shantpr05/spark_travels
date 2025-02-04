import trashbin from './trashbin.png';
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
                <h1 className={styles.textLogo}> <span>SPARK</span> Stay</h1>
                <img src={trashbin} width='80px' alt='trashbin pictogram'/>
                <p>Are you sure you want to delete the hotel from the list?</p>

                <div className={styles.deleteButtons}>                    
                    <button className={styles.deleteButton} onClick={onYes}>Yes</button>
                    <button className={styles.deleteButton} onClick={onLeave}>No</button>
                </div>
            </div>
        </div>
    );
};