import trashbin from './trashbin.png';
import logo from '../../assets/logo.png';
import styles from './DeleteItem.module.css';

export const DeleteItem =({onDelete, onLeave}) => {
    // onYes handler is called when the user confirms deletion
    const onYes = () => {
        onDelete();  // Executes the deletion logic passed from parent component
        onLeave();  // Closes the modal after deletion
    };

    return (
        <div className={styles.deleteItemWrapper}>
            <div className={styles.deleteItemModal}>
                {/* Displaying the logo of the app */}
                <h1 className={styles.textLogo}><span>SPARK</span> Stay</h1>

                {/* Display trashbin icon as an indicator of deletion action */}
                <img src={trashbin} width='100px' alt='trashbin pictogram'/>

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