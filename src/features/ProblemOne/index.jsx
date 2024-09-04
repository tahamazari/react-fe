import { useState } from "react";
import axios from "axios";

import { Sidebar, Dropdown, Badge, Input, Button } from "../../components";
import { BASE_TABLES, BASE_TABLE_COLUMNS, API_URL } from "../../constants";
import WarningBar from "./WarningBar";
import TableSection from "./TableSection";

const ProblemOne = () => {
    const [currentTable, setCurrentTable] = useState({});
    const [filterableItem, setFilterableItem] = useState("");
    const [filter, setFilter] = useState("");
    const [tables, setTables] = useState("");
    const [warning, setWarning] = useState("");

    const [eventsFilter, setEventsFilter] = useState("")

    const extractValuesFromObjects = (data) => {
        return data.map(obj => Object.values(obj));
    };

    const clearFilters = () => {
        setCurrentTable({});
        setFilterableItem("");
        setFilter("");
        setTables("");
        setWarning("");
    };

    const applyFilterAndFetchData = async () => {
        setWarning("");
        try {
            const response = await axios.post(`${API_URL}/process`, {
                table: currentTable.value,
                column: filterableItem.value,
                filter
            });

            const { company_info = [], employee_info = [], events_info = [] } = response.data || {};

            if (company_info.length && employee_info.length && events_info.length) {
                setTables(response.data);
            } else {
                setWarning("Sorry! No data found against current filter.");
            }
        } catch (error) {
            setWarning("An error occurred while fetching data.");
        }
    };

    return (
        <Sidebar>
            <div>Problem 1</div>
            <div className="flex flex-col">
                <div className="flex pl-3 pt-2 items-center">
                    <h4 className="mt-4 text-md font-semibold text-gray-800 mb-2 pb-1">
                        Events
                    </h4>
                    <div className="pl-3 pt-2">
                        <Dropdown selectedItem={eventsFilter?.label} items={BASE_TABLE_COLUMNS["events_info"]} onSelect={setEventsFilter} />
                    </div>
                    {/* <Dropdown selectedItem={currentTable?.label} items={BASE_TABLES} onSelect={setCurrentTable} /> */}
                </div>
                <div className="flex pl-3 pt-2 items-center">
                    <h4 className="mt-4  text-md font-semibold text-gray-800 mb-2 pb-1">
                        Companies
                    </h4>
                    <div className="pl-3 pt-2">
                        <Dropdown selectedItem={filterableItem?.label} items={BASE_TABLE_COLUMNS["company_info"]} onSelect={setFilterableItem} />
                    </div>
                </div>
                <div className="flex pl-3 pt-2 items-center">
                    <h4 className="mt-4 text-md font-semibold text-gray-800 mb-2 pb-1">
                        Employees
                    </h4>
                    <div className="pl-3 pt-2">
                        <Dropdown selectedItem={filterableItem?.label} items={BASE_TABLE_COLUMNS["employee_info"]} onSelect={setFilterableItem} />
                    </div>
                </div>
                {currentTable.label && (
                    <>
                        <div className="pl-3 pt-2">
                            <Badge label={currentTable.label} />
                        </div>
                        <div className="pl-3 pt-2">
                            <Dropdown selectedItem={filterableItem?.label} items={BASE_TABLE_COLUMNS[currentTable.value]} onSelect={setFilterableItem} />
                        </div>
                    </>
                )}
                {filterableItem && (
                    <div className="pl-3 pt-2">
                        <Badge label={filterableItem.label} />
                    </div>
                )}
            </div>
            {filterableItem && (
                <div className="flex pl-3 pt-2 items-center">
                    <Input className="w-52 p-2 h-10" label="Filter" onChange={(e) => setFilter(e.target.value)} />
                    {currentTable.label && filterableItem && filter && (
                        <>
                            <Button title="Search" className="h-10 mt-6 ml-5" onClick={applyFilterAndFetchData} />
                            <Button title="Clear" className="h-10 mt-6 ml-5 bg-gray-400 hover:bg-gray-500" onClick={clearFilters} />
                        </>
                        
                    )}
                </div>
            )}
            {tables && (
                <div className="flex flex-col">
                    <TableSection title="Events" data={tables["events_info"]} extractValues={extractValuesFromObjects} />
                    <TableSection title="Companies" data={tables["company_info"]} extractValues={extractValuesFromObjects} />
                    <TableSection title="Employees" data={tables["employee_info"]} extractValues={extractValuesFromObjects} />
                </div>
            )}
            {warning && <WarningBar message={warning} />}
        </Sidebar>
    );
};

export default ProblemOne;
