import { useState, useEffect } from "react";
import { Dropdown, Input, Button, Badge } from "../components";
import { XMarkIcon } from "@heroicons/react/24/solid";

const FilterSection = ({ title, columns, onAddFilter, clearValues, onRemoveFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filters, setFilters] = useState([]);
    const [outputColumns, setOutputColumns] = useState(columns);

    const addFilter = () => {
        const newFilter = { key: selectedFilter.value, value: filterValue };
        setFilters([...filters, newFilter]);
        onAddFilter(newFilter); // Pass the filter up to the parent
        setSelectedFilter("");
        setFilterValue("");
    };

    const removeFilter = (indexToRemove) => {
        const filterToRemove = filters[indexToRemove];
        setFilters(filters.filter((_, index) => index !== indexToRemove));
        onRemoveFilter(filterToRemove); // Notify parent to remove from allFilters
    };

    const removeColumn = (value) => {
        setOutputColumns(outputColumns.filter(col => col.value !== value));
    };

    const resetColumns = () => {
        setOutputColumns(columns); // Reset to initial columns
    };

    useEffect(() => {
        if (clearValues) {
            setSelectedFilter("");
            setFilterValue("");
            setFilters([]);
        }
    }, [clearValues]);

    return (
        <div className="flex flex-col mb-4">
            <div className="flex items-center">
                <h4 className="mt-4 text-md font-semibold text-gray-800 mb-2 pb-1">
                    {title}
                </h4>
                <div className="pl-3 pt-2">
                    <Dropdown selectedItem={selectedFilter?.label} items={columns} onSelect={setSelectedFilter} />
                </div>
                <div className="flex ml-4">
                    {selectedFilter && (
                        <>
                            <Input
                                className="w-52 p-2 h-10"
                                label={selectedFilter.label}
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                            {filterValue && (
                                <Button title="Add Filter" className="h-10 mt-6 ml-5" onClick={addFilter} />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap">
                {filters.map((filter, index) => (
                    <Badge
                        key={index}
                        className="px-6px mr-2"
                        label={`${filter.key}: ${filter.value}`}
                        icon
                        onClick={() => removeFilter(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilterSection;
