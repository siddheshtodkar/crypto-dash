const FilterInput = ({ filter, changeFilter }) => {
    return (
        <div className="filter">
            <input type="text" value={filter} onChange={(e) => changeFilter(e.target.value.toLowerCase())}
                placeholder="Filter Coins by Name or Symbol" />
        </div>
    );
}

export default FilterInput;