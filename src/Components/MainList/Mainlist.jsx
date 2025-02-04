import { useState, useCallback } from "react";
import styles from './Mainlist.module.css';
import { DeleteItem } from "../DeleteItem/DeleteItem";
import hotel from './imagemain.png';  // Default image for hotel
import { EditHotel } from "../editItem/EditHotel";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt } from "react-icons/fa";


export const Mainlist = ({hotels, setHotels}) => {
    // States to manage modal visibility and hotel data
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [editHotel, setEditHotel] = useState()
    const [deletedItemId, setDeletedItemId] = useState()

    const [visibleHotels, setVisibleHotels] = useState(9);

    
    // Function to delete a hotel based on its ID
    const deleteHotel = useCallback((hotelId) => {
        setHotels(prevHotels => prevHotels.filter(h => h.properties.place_id !== hotelId));
    }, [setHotels]);

    const onRemove = useCallback((hotelId) => {
        deleteHotel(hotelId);
    }, [deleteHotel]);

    // Function to handle saving of edited hotel data
    const handleSave = useCallback((updatedHotel) => {
        setHotels((prevHotels) =>
            prevHotels.map((h) =>
                h.properties.place_id === updatedHotel.properties.place_id
                    ? updatedHotel  // If place_id matches, replace the hotel with updated data
                    : h
            )
        );
        setIsOpenEdit(false);  // Close the edit modal after saving
    }, [setHotels]);
    
    
    // Function to load more hotels when "See More" button is clicked
    const loadMore = () => {
        setVisibleHotels(prevVisible => prevVisible + 9);
    };

    return (
        <>
        <h1>My Hotel List</h1>
            <div>
                <ul className={styles.main}>
                    {hotels?.slice(0, visibleHotels).map((item) => (
                        <li key={item.properties.place_id} className={styles.item}>
                            {/* {item?.geometry?.coordinates ?
                                <img 
                                    src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=200&height=100&center=lonlat:${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}&zoom=14&apiKey=7e2095ee83924cbf9b1d99db359cfd5d`}
                                    alt="Hotel Location Map"
                                    className={styles.hotelImage}
                                    loading="lazy"
                                />
                                : 
                                <img 
                                    src={hotel}  // Default hotel image if no coordinates are found
                                    alt="Default hotel"
                                    className={styles.hotelImage}
                                    loading="lazy"
                                />
                            } */}
                            <img 
                                src={hotel}  
                                alt="Default hotel"
                                className={styles.hotelImage}
                                loading="lazy"
                            />
                            <div className={styles.hotelDescription}>
                                <h2 className={styles.hotelName}> {item.properties.name}</h2>
                                <p><FaMapMarkerAlt /> {item.properties.address_line2}</p>
                                <p><FaCity /> {item.properties.city}</p>
                                <p><FaPhoneAlt /> {item.properties.contact?.phone}</p>
                            </div>
                            <div className={styles.hotelButtons}> 
                                {/* Edit button to open edit modal */}
                                <button className={styles.hotelButton} onClick={() => {
                                    setIsOpenEdit(true);
                                    setEditHotel(item);   // Set the hotel being edited
                                }}>Edit</button>
                                {/* Delete button to open delete confirmation modal */}
                                <button className={styles.hotelButton} onClick={() => {
                                    setIsOpenDelete(true);
                                    setDeletedItemId(item.properties.place_id);  // Set the hotel ID to be deleted
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
                onCancel={() => setIsOpenEdit(false)}  // Close the edit modal on cancel
                onSave={handleSave}   // Save the updated hotel data
                hotel={editHotel}   
                
            />}
            {/* Delete hotel confirmation modal */}
            {isOpenDelete && <DeleteItem onLeave={() => setIsOpenDelete(false)} onDelete={() => onRemove(deletedItemId)}/>}
        </>
    )
}
