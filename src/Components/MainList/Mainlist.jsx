import { useState, useCallback, useEffect } from "react";
import styles from './Mainlist.module.css';
import { DeleteItem } from "../DeleteItem/DeleteItem";
import hotel from './imagemain.png';  // Default image for hotel
import { EditHotel } from "../editItem/EditHotel";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaGlobe } from "react-icons/fa";

export const Mainlist = ({hotels, setHotels}) => {
    // States to manage modal visibility and hotel data
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [editHotel, setEditHotel] = useState();
    const [deletedItemId, setDeletedItemId] = useState();
    const [visibleHotels, setVisibleHotels] = useState(9);
    const [noResults, setNoResults] = useState(false);  // Add state for no results message

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

    // Check if there are any hotels after filtering and set noResults accordingly
    useEffect(() => {
        if (hotels?.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [hotels]);

    return (
        <>
        <h1 className={styles.hotelName}>MY HOTEL LIST</h1>
            <div>
                {noResults ? (
                    // Show this message if there are no hotels to display
                    <p className={styles.noResultsMessage}>No results found</p>
                ) : (
                    <ul className={styles.main}>
                        {hotels?.slice(0, visibleHotels).map((item) => (
                            <li key={item.properties.place_id} className={styles.item}>
                                {/* Image of hotel location */}
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
                                alt=""
                                className={styles.hotelImage}
                                loading="lazy"
                                aria-hidden="true"
                            />
                                <div className={styles.hotelDescription}>
                                    <h2 className={styles.hotelName}> {item.properties.name}</h2>
                                    <p><FaMapMarkerAlt /> {item.properties.address_line2}</p>
                                    <p><FaCity /> {item.properties.city}</p>
                                    <p><FaPhoneAlt /> {item.properties.contact?.phone}</p>
                                </div>
                                <div className={styles.hotelButtons} role="group" aria-label={`Actions for ${item.properties.name}`}> 
                                    <button 
                                        className={styles.hotelButton} 
                                        onClick={() => {
                                            setIsOpenEdit(true);
                                            setEditHotel(item);   
                                        }} 
                                        aria-label={`Edit ${item.properties.name}`}
                                    >
                                    Edit</button>
                                    <button 
                                        className={styles.hotelButton} 
                                        onClick={() => {
                                            setIsOpenDelete(true);
                                            setDeletedItemId(item.properties.place_id);  
                                        }} 
                                        aria-label={`Delete ${item.properties.name}`}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {visibleHotels < hotels?.length && (
                    <button 
                        onClick={loadMore} 
                        className={styles.seeMoreButton}
                        aria-label={`Load ${Math.min(9, hotels.length - visibleHotels)} more hotels`}
                    > 
                    See More
                    </button>
                )}
            </div>
            {isOpenEdit && <EditHotel 
                onCancel={() => setIsOpenEdit(false)} 
                onSave={handleSave}   
                hotel={editHotel}   
            />}
            {isOpenDelete && <DeleteItem onLeave={() => setIsOpenDelete(false)} onDelete={() => onRemove(deletedItemId)} />}
        </>
    );
};
