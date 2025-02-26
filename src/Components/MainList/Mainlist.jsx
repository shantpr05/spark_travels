import { useState, useCallback, useEffect } from "react";
import styles from './Mainlist.module.css';
import { DeleteItem } from "../DeleteItem/DeleteItem";
import hotel from '../../assets/hotel.png';  
import { EditHotel } from "../editItem/EditHotel";
import { FaMapMarkerAlt, FaCity, FaPhoneAlt, FaInternetExplorer } from "react-icons/fa";
import FilterComponent from '../FilterComponent/FilterComponent';

export const Mainlist = ({hotels, setHotels,locations, locationFilter, setLocationFilter, categories, categoryFilter, setCategoryFilter}) => {
    
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [editHotel, setEditHotel] = useState();
    const [deletedItemId, setDeletedItemId] = useState();
    const [visibleHotels, setVisibleHotels] = useState(9);
    const [noResults, setNoResults] = useState(false);  

   
    const deleteHotel = useCallback((hotelId) => {
        setHotels(prevHotels => prevHotels.filter(h => h.properties.place_id !== hotelId));
    }, [setHotels]);

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
        setIsOpenEdit(false);  // Close the edit modal after saving
    }, [setHotels]);

    const loadMore = () => {
        setVisibleHotels(prevVisible => prevVisible + 9);
    };

    useEffect(() => {
        if (hotels?.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [hotels]);

    return (
        <>
        <h1 className={styles.pageName}>MY HOTEL LIST</h1>
            <FilterComponent 
                locations={locations} 
                locationFilter={locationFilter} 
                setLocationFilter={setLocationFilter} 
                categories={categories} 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
            />
            <div>
                {noResults ? (
                    <p className={styles.noResultsMessage}>No results found</p>
                ) : (
                    <ul className={styles.main}>
                        {hotels?.slice(0, visibleHotels).map((item) => (
                            <li key={item.properties.place_id} className={styles.item}>
                            <img 
                                src={hotel}  
                                // should set a proper alt text
                                alt=""
                                className={styles.hotelImage}
                                loading="lazy"
                                aria-hidden="true"
                            />
                                <div className={styles.hotelDescription}>
                                    <h2 className={styles.hotelName}> {item.properties.name}</h2>
                                    <p><FaMapMarkerAlt /> {item.properties.address_line2 ? item.properties.address_line2 : <span className={styles.noData}> No data </span>}</p>
                                    <p><FaCity /> {item.properties.city}</p>
                                    <p><FaPhoneAlt /> {item.properties.contact?.phone}</p>
                                    <p><FaInternetExplorer /> {item.properties?.website ? item.properties?.website :<span className={styles.noData}> No data </span>} </p>
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
