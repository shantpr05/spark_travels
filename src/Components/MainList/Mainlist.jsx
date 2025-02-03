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

    
    const deleteHotel = useCallback((hotelId) => {
        setHotels(prevHotels => prevHotels.filter(h => h.properties.place_id !== hotelId));
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
                <ul className={styles.main}>
                    {hotels?.slice(0, visibleHotels).map((item) => (
                        <li key={item.properties.place_id} className={styles.item}>
                            {item?.geometry?.coordinates ? 
                            <img 
                                src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=200&height=100&center=lonlat:${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}&zoom=14&apiKey=7e2095ee83924cbf9b1d99db359cfd5d`}
                                alt="Hotel Location Map"
                                className={styles.hotelImage}
                                loading="lazy"
                            />
                            : 
                            <img 
                                src={hotel}
                                alt="Default hotel"
                                className={styles.hotelImage}
                                loading="lazy"
                            />
                            }
                            <div className={styles.hotelDescription}>
                                <h2 className={styles.hotelName}> {item.properties.name}</h2>
                                <p>{item.properties.address_line2}</p>
                                <p>{item.properties.city}</p>
                                <p>{item.properties.contact?.phone}</p>
                            </div>
                            <div className={styles.hotelButtons}> 
                                <button className={styles.hotelButton} onClick={() => {
                                    setIsOpenEdit(true);
                                    setEditHotel(item);
                                }}>Edit</button>
                                <button className={styles.hotelButton} onClick={() => {
                                    setIsOpenDelete(true);
                                    setDeletedItemId(item.properties.place_id);
                                }}>Delete</button>
                            </div>
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
