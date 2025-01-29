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
                <img src={logo} alt='logo'></img>
                <img src={trashbin} alt='delete'></img>
                <p>Are you sure do you want to delete the hotel from list?</p>
                <div>
                    <button onClick={onYes}>Yes</button>
                    <button onClick={onLeave}>No</button>
                </div>
            </div>
        </div>
    )
}