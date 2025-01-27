import { useState, useEffect, useCallback } from "react";
import { fetchData, apiUrl } from "../Functions/FetchApi";
import styles from './styles.module.css';

export const Mainlist = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const f = async () => {
            try {
                const response = await fetchData(apiUrl);
                setHotels(response.features);
            } catch (error) {
                console.error(error);
            }
        }
        f();
    }, []);

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

    return (
        <div>
            <div>Hotels</div>
            <ul className={styles.main}>
                {hotels?.map((item) => 
                    <li key={item.properties.place_id} className={styles.item}>
                        {item.properties.name}
                        {item.properties.address_line2}
                        {item.properties.city}
                        {item.properties.contact?.phone}
                        {item.properties.website && <img src={`https://image.thum.io/get/width/300/${item.properties.website}`} alt="Screenshot" />}
                        <button onClick={() => onEdit(item)}>Edit</button>
                        <button onClick={() => onRemove(item.properties.place_id)}>Remove</button>
                    </li>
                )}
            </ul> 
        </div>
    )
}
