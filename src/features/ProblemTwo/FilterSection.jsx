import { Input, Button, Dropdown } from "../../components";

const dateConditions = [
    {
        label: "Greater Than Equal to",
        value: "greater-than-equal-to"
    },
    {
        label: "Lesser Than Equal to",
        value: "less-than-equal-to"
    }
]

const FilterSection = ({ label, value, type, onValueChange, onAddFilter, setDateFilter }) => {
    return (
        <div className="flex flex-row items-center mt-5 mb-4">
            <Input
                className="w-52 p-2 h-10"
                label={label}
                value={value}
                onChange={onValueChange}
            />
            {
                type === "date" &&
                <div className="w-52 pt-6 ml-6">
                    <Dropdown className="w-[90%]" onSelect={setDateFilter} items={dateConditions}/>
                </div>
            }
            {value && (
                <Button
                    title="Add Filter"
                    className="h-10 ml-4 mt-6"
                    onClick={onAddFilter}
                />
            )}
        </div>
    );
};

export default FilterSection;
