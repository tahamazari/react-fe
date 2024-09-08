import { useState } from "react";
import axios from "axios";

import { Sidebar, Button } from "../../components";
import { BASE_TABLES, BASE_TABLE_COLUMNS, API_URL } from "../../constants";
import WarningBar from "../WarningBar";
import TableSection from "../TableSection";
import FilterSection from "../FilterSection";

const ProblemOne = () => {
    const [tables, setTables] = useState("");
    const [warning, setWarning] = useState("");
    const [loading, setLoading] = useState(false);
    const [allFilters, setAllFilters] = useState({});
    const [clearValues, setClearValues] = useState(false); // State to trigger clearing filters

    const clearFilters = () => {
        setTables("");
        setWarning("");
        setAllFilters({}); // Reset all filters
        setClearValues(true); // Trigger clear filters in FilterSection components

        // Reset clearValues back to false after a short delay to ensure that it works every time
        setTimeout(() => setClearValues(false), 0);
    };

    const applyFilterAndFetchData = async () => {
        console.log(allFilters);
        setWarning("");
        setLoading(true)
        setTables("");
        try {
            const response = await axios.post(`${API_URL}/process`, {
                ...allFilters,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { company_info = [], employee_info = [], events_info = [] } = response.data || {};

            if (company_info.length && employee_info.length && events_info.length) {
                setTables(response.data);
            } else {
                setTables({
                    "company_info": [],
                    "employee_info": [],
                    "events_info": []
                });
                setWarning("Sorry! No data found against current filters.");
            }
            setLoading(false)
        } catch (error) {
            setWarning("An error occurred while fetching data.");
            setLoading(false)
        }
    };

    const handleAddFilter = (type, filter) => {
        setAllFilters(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), filter]
        }));
    };

    const handleRemoveFilter = (type, filter) => {
        setAllFilters(prev => {
            const updatedFilters = prev[type].filter(f => f.key !== filter.key || f.value !== filter.value);
            return {
                ...prev,
                [type]: updatedFilters
            };
        });
    };

    const hasFilters = Object.keys(allFilters).some(key => allFilters[key].length > 0);

    return (
        <Sidebar>
            <div>Problem 1</div>
            <FilterSection
                title="Events"
                columns={BASE_TABLE_COLUMNS["events_info"]}
                onAddFilter={(filter) => handleAddFilter("events_info", filter)}
                clearValues={clearValues} // Pass the clearValues prop
                onRemoveFilter={(filter) => handleRemoveFilter("events_info", filter)}
            />
            <FilterSection
                title="Companies"
                columns={BASE_TABLE_COLUMNS["company_info"]}
                onAddFilter={(filter) => handleAddFilter("company_info", filter)}
                clearValues={clearValues} // Pass the clearValues prop
                onRemoveFilter={(filter) => handleRemoveFilter("company_info", filter)} 
            />
            <FilterSection
                title="Employees"
                columns={BASE_TABLE_COLUMNS["employee_info"]}
                onAddFilter={(filter) => handleAddFilter("employee_info", filter)}
                clearValues={clearValues} // Pass the clearValues prop
                onRemoveFilter={(filter) => handleRemoveFilter("employee_info", filter)} 
            />

            {hasFilters && (
                <div className="flex pt-2">
                    <Button title="Search" className="h-10 mt-6 ml-5" onClick={applyFilterAndFetchData} />
                    <Button title="Clear Filters" className="h-10 mt-6 ml-5 bg-red-600 hover:bg-gray-700" onClick={clearFilters} />
                </div>
            )}

            {tables && !loading ?
                <div className="flex flex-col">
                    <TableSection title="Events" data={tables["events_info"]} />
                    <TableSection title="Companies" data={tables["company_info"]} />
                    <TableSection title="Employees" data={tables["employee_info"]} />
                </div> : 
                <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-blue-500 border-solid"></div>
                </div>
            }

            {warning && <WarningBar message={warning} />}
        </Sidebar>
    );
};

export default ProblemOne;
