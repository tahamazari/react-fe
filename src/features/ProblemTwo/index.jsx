import { useState } from "react";
import axios from "axios";
import { Sidebar, Button, OutputColumns } from "../../components";
import { BASE_TABLE_COLUMNS, API_URL } from "../../constants";
import WarningBar from "../WarningBar";
import FilterSection from "../FilterSection";

const ProblemTwo = () => {
    const [tables, setTables] = useState({}); // To store the returned tables data
    const [warning, setWarning] = useState("");
    const [allFilters, setAllFilters] = useState({});
    const [clearValues, setClearValues] = useState(false);

    // Helper function to determine active tables based on filters
    const getActiveTables = () => {
        return Object.keys(allFilters).filter(
            (table) => allFilters[table] && allFilters[table].length > 0
        );
    };

    const clearFilters = () => {
        setTables({}); // Reset the tables
        setWarning("");
        setAllFilters({});
        setClearValues(true);
        setTimeout(() => setClearValues(false), 0);
    };

    const applyFilterAndFetchData = async () => {
        const activeTables = getActiveTables(); // Get the active tables based on filters

        if (activeTables.length === 0) {
            setWarning("Please apply filters to fetch data.");
            return;
        }

        setWarning("");
        try {
            // Send the active tables and filters to the backend
            const response = await axios.post(`${API_URL}/process`, {
                tables: activeTables, // Send the active tables
                filters: { ...allFilters },
            });

            // Destructure the response data to extract the relevant tables
            const { company_info = [], employee_info = [], events_info = [] } = response.data || {};

            // Set the tables if there's any data, otherwise show a warning
            if (company_info.length || employee_info.length || events_info.length) {
                setTables(response.data); // Update tables with the response data
            } else {
                setWarning("Sorry! No data found against current filters.");
            }
        } catch (error) {
            setWarning("An error occurred while fetching data.");
        }
    };

    const handleAddFilter = (type, filter) => {
        setAllFilters((prev) => ({
            ...prev,
            [type]: [...(prev[type] || []), filter],
        }));
    };

    const handleRemoveFilter = (type, filter) => {
        setAllFilters((prev) => {
            const updatedFilters = prev[type].filter((f) => f.key !== filter.key || f.value !== filter.value);
            return {
                ...prev,
                [type]: updatedFilters,
            };
        });
    };

    const hasFilters = Object.keys(allFilters).some((key) => allFilters[key].length > 0);

    return (
        <Sidebar>
            <div>Problem 2</div>

            {/* Filters for Events, Companies, and Employees */}
            <FilterSection
                title="Events"
                columns={BASE_TABLE_COLUMNS["events_info"]}
                onAddFilter={(filter) => handleAddFilter("events_info", filter)}
                clearValues={clearValues}
                onRemoveFilter={(filter) => handleRemoveFilter("events_info", filter)}
            />
            <FilterSection
                title="Companies"
                columns={BASE_TABLE_COLUMNS["company_info"]}
                onAddFilter={(filter) => handleAddFilter("company_info", filter)}
                clearValues={clearValues}
                onRemoveFilter={(filter) => handleRemoveFilter("company_info", filter)}
            />
            <FilterSection
                title="Employees"
                columns={BASE_TABLE_COLUMNS["employee_info"]}
                onAddFilter={(filter) => handleAddFilter("employee_info", filter)}
                clearValues={clearValues}
                onRemoveFilter={(filter) => handleRemoveFilter("employee_info", filter)}
            />

            {/* Action Buttons */}
            {hasFilters && (
                <div className="flex pt-2">
                    <Button title="Search" className="h-10 mt-6 ml-5" onClick={applyFilterAndFetchData} />
                    <Button title="Clear Filters" className="h-10 mt-6 ml-5 bg-red-600 hover:bg-gray-700" onClick={clearFilters} />
                </div>
            )}

            <OutputColumns />

            {/* Conditionally Render CustomTableSection for Each Section */}
            {/* <div className="flex flex-col">
                {tables.events_info?.length > 0 && (
                    <CustomTableSection title="Events" data={tables["events_info"]} />
                )}
                {tables.company_info?.length > 0 && (
                    <CustomTableSection title="Companies" data={tables["company_info"]} />
                )}
                {tables.employee_info?.length > 0 && (
                    <CustomTableSection title="Employees" data={tables["employee_info"]} />
                )}
            </div> */}

            {warning && <WarningBar message={warning} />}
        </Sidebar>
    );
};

export default ProblemTwo;
