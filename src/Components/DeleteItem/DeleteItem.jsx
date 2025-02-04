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
                {/* Displaying the logo of the app */}
                <img src={logo} width='200px' alt='logo Spark Travel'/>

                {/* Display trashbin icon as an indicator of deletion action */}
                <img src={trashbin} width='80px' alt='trashbin pictogram'/>

                {/* Confirmation message asking if the user is sure about deletion */}
                <p>Are you sure do you want to delete the hotel from list?</p>

                <div className={styles.deleteButtons}>                    
                    {/* Button to confirm deletion */}
                    <button className={styles.deleteButton} onClick={onYes}>Yes</button>

                    {/* Button to cancel deletion and close modal */}
                    <button className={styles.deleteButton} onClick={onLeave}>No</button>
                </div>
            </div>
        </div>
    );
};