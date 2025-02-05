import styles from './FilterComponent.module.css';

const FilterComponent = ({
    locations, 
    locationFilter, 
    setLocationFilter, 
    categories, 
    categoryFilter, 
    setCategoryFilter
}) => {
    return (
        <div className={styles.filterContainer}>
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={styles.filterInput}
            >
                <option value="" className="placeholder">All Locations</option>
                {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
            
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterInput}
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterComponent;
