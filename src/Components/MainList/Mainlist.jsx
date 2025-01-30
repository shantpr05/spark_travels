import { useState, useCallback } from "react";
import styles from './Mainlist.module.css';
import { DeleteItem } from "../DeleteItem/DeleteItem";
import hotel from './hotel.png';
import { EditHotel } from "../editItem/EditHotel";
export const Mainlist = ({hotels, setHotels}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [EditHotelId, setEditHotelId] = useState()
    const [deletedItemId, setDeletedItemId] = useState()
    const [visibleHotels, setVisibleHotels] = useState(9);
    console.log('l')
    const onOpen = () => {
        setIsOpen(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }

    // const updateHotel = useCallback((updatedHotel) => {
    //     setHotels(prevHotels => {
    //         const index = prevHotels.findIndex(h => h.properties.place_id === updatedHotel.properties.place_id);
    //         if (index !== -1) {
    //             const newHotels = [...prevHotels];
    //             newHotels[index] = updatedHotel;
    //             return newHotels;
    //         }
    //         return prevHotels;
    //     });
    // }, []);

    // const addHotel = useCallback((newHotel) => {
    //     setHotels(prevHotels => [...prevHotels, newHotel]);
    // }, []);

    const deleteHotel = useCallback((hotelId) => {
        setHotels(prevHotels => prevHotels.filter(h => h.properties.place_id !== hotelId));
    }, []);

    const onEdit = useCallback((hotel) => {
        console.log("Editing hotel:", hotel);
    }, []);

    const onRemove = useCallback((hotelId) => {
        deleteHotel(hotelId);
    }, [deleteHotel]);

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
                            {/* <button onClick={() => onEdit(item)}>Edit</button> */}
                             <button onClick={() => {
                                onOpen();
                                setEditHotelId(item.properties.place_id);
                            }}>Edit</button>
                            <button onClick={() => {
                                onOpen();
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
            {isOpen && <EditHotel onLeave={onClose} onEdit={() => onEdit(EditHotelId)} />}
            {isOpen && <DeleteItem onLeave={onClose} onDelete={() => onRemove(deletedItemId)}/>}
        </>
    )
}
