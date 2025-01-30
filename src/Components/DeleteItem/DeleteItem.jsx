import trashbin from './trashbin.png';
import logo from '../../assets/logo.png';
import styles from './DeleteItem.module.css';

export const DeleteItem =({onDelete, onLeave}) => {
    const onYes = () => {
        onDelete()
        onLeave()
    }
    return (
        <div className={styles.deleteItemWrapper}>
            <div className={styles.deleteItemModal}>
                <img src={logo} width='200px' alt='logo Spark Travel'></img>
                <img src={trashbin} width='80px' alt='trashbin pictogram'></img>
                <p>Are you sure do you want to delete the hotel from list?</p>
                <div className={styles.deleteButtons}>
                    <button className={styles.deleteButton} onClick={onYes}>Yes</button>
                    <button className={styles.deleteButton} onClick={onLeave}>No</button>
                </div>
            </div>
        </div>
    )
}