import { useState } from "react";
import axios from "axios";

import { Sidebar, Button, Dropdown, Input, Badge, Table, OutputColumns } from "../../components";
import { COMBINED_TABLE_COLUMNS, API_URL } from "../../constants";
import FilterSection from "./FilterSection";
import FilterBadge from "./FilterBadge";

const ProblemTwo = () => {
    const [allFilters, setAllFilters] = useState([]);
    const [activeFilter, setActiveFilter] = useState({});
    const [filterValue, setFilterValue] = useState("");
    const [outputColumns, setOutputColumns] = useState([])
    const [warning, setWarning] = useState("");
    const [table, setTable] = useState("");

    const [dateFilter, setDateFilter] = useState({
        label: "Greater Than Equal to",
        value: "greater-than-equal-to"
    },)

    const setFilter = (filter) => {
        setActiveFilter(filter);
    };

    const addFilter = () => {
        const isDateTypeFilter = activeFilter.type === "date";
        const newFilter = [activeFilter.value, isDateTypeFilter ? dateFilter.value : "includes", [filterValue]];
        setAllFilters([...allFilters, newFilter]);
        setActiveFilter({});
        setFilterValue("");
    };

    const onSetOutputColumns = (column) => {
        // Check if the column already exists in the array
        if (outputColumns.includes(column)) {
            // Remove the column if it exists
            const filteredColumns = outputColumns.filter(item => item !== column);
            setOutputColumns(filteredColumns);
        } else {
            // Add the column if it doesn't exist
            setOutputColumns([...outputColumns, column]);
        }
    };

    const extractValuesFromObjects = (data) => {
        return data.map(obj => Object.values(obj));
    }

    const applyFilterAndFetchData = async () => {
        console.log(allFilters);
        setWarning("");
        try {
            const response = await axios.post(`${API_URL}/query`, {
                "filter_arguments": [...allFilters],
                "output_columns": [...outputColumns]
            });

            const data = response.data || {};

            if (data.length) {
                setTable(data);
            } else {
                setWarning("Sorry! No data found against current filters.");
            }
        } catch (error) {
            setWarning("An error occurred while fetching data.");
        }
    };

    return (
        <Sidebar>
            <div className="px-4 py-6">
                <h1 className="text-xl font-bold mb-4">Problem 2</h1>

                {/* Dropdown for selecting filter */}
                <Dropdown items={COMBINED_TABLE_COLUMNS} onSelect={setFilter} />

                {/* Filter input section */}
                {activeFilter.label && (
                    <FilterSection
                        label={activeFilter.label}
                        type={activeFilter.type}
                        value={filterValue}
                        onValueChange={(e) => setFilterValue(e.target.value)}
                        onAddFilter={addFilter}
                        setDateFilter={setDateFilter}
                    />
                )}

                {/* Display all filters as badges */}
                <div className="my-4">
                    {allFilters.map((filter, index) => (
                        <FilterBadge key={index} filter={filter} />
                    ))}
                </div>

                {
                    <div>
                        <OutputColumns activeColumns={outputColumns} onClick={onSetOutputColumns} columns={COMBINED_TABLE_COLUMNS.slice(0, 6)}/>
                        <OutputColumns activeColumns={outputColumns} onClick={onSetOutputColumns} columns={COMBINED_TABLE_COLUMNS.slice(6, 11)}/>
                        <OutputColumns activeColumns={outputColumns} onClick={onSetOutputColumns} columns={COMBINED_TABLE_COLUMNS.slice(11)}/>
                    </div>
                }
                {/* Search button */}
                {!!allFilters.length && !!outputColumns.length && (
                    <Button title="Search" className="h-10 mt-5 mb-6" onClick={applyFilterAndFetchData} />
                )}
                {
                    !!table.length &&
                    <Table columns={Object.keys(table[0])} rows={extractValuesFromObjects(table)}/>
                }
            </div>
        </Sidebar>
    );
};

export default ProblemTwo;
