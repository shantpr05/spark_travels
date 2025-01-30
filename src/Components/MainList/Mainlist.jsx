import { useState, useCallback } from "react";
import styles from './Mainlist.module.css';
import { DeleteItem } from "../DeleteItem/DeleteItem";
import hotel from './hotel.png';
import { EditHotel } from "../editItem/EditHotel";

export const Mainlist = ({hotels, setHotels}) => {
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [editHotel, setEditHotel] = useState()
    const [deletedItemId, setDeletedItemId] = useState()

    const [visibleHotels, setVisibleHotels] = useState(9);
    console.log('l')

    const deleteHotel = useCallback((hotelId) => {
        setHotels(prevHotels => prevHotels.filter(h => h.properties.place_id !== hotelId));
    }, []);

    const onEdit = useCallback((hotel) => {
        console.log("Editing hotel:", hotel);
    }, []);

    const onRemove = useCallback((hotelId) => {
        deleteHotel(hotelId);
    }, [deleteHotel]);

    const handleSave = useCallback((updatedHotel) => {
        setHotels((prevHotels) =>
            prevHotels.map((h) =>
                h.properties.place_id === updatedHotel.properties.place_id
                    ? updatedHotel
                    : h
            )
        );
        setIsOpenEdit(false);
    }, [setHotels]);
    

    const loadMore = () => {
        setVisibleHotels(prevVisible => prevVisible + 9);
    };

    return (
        <>
            <div>
                <div>Hotels</div>
                
                <ul className={styles.main}>
                    {hotels?.slice(0, visibleHotels).map((item) => (
                        <li key={item.properties.place_id} className={styles.item}>
                            {item.properties.name}
                            {item.properties.address_line2}
                            {item.properties.city}
                            {item.properties.contact?.phone}
                            {item.properties.website ? (
                                <img 
                                    src={`https://image.thum.io/get/width/300/${item.properties.website}`} 
                                    alt="Screenshot" 
                                    className={styles.hotelImage}
                                    loading="lazy"
                                />
                            ) : <img src={hotel} alt='hotel' />}
                             <button onClick={() => {
                                setIsOpenEdit(true);
                                setEditHotel(item);
                            }}>Edit</button>
                            <button onClick={() => {
                                setIsOpenDelete(true);
                                setDeletedItemId(item.properties.place_id);
                            }}>Delete</button>
                        </li>
                    ))}
                </ul>
                {visibleHotels < hotels?.length && (
                    <button onClick={loadMore} className={styles.seeMoreButton}>
                        See More
                    </button>
                )}
            </div>
            {isOpenEdit && <EditHotel 
                onCancel={() => setIsOpenEdit(false)} 
                onSave={handleSave} 
                hotel={editHotel}
                
                
            />}
            {isOpenDelete && <DeleteItem onLeave={() => setIsOpenDelete(false)} onDelete={() => onRemove(deletedItemId)}/>}
        </>
    )
}
