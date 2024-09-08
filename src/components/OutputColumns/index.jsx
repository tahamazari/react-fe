import { Button } from "../"

const defaultColumns = [{ label: "Name", value: "name" }, { label: "Date", value: "date" }, { label: "Age", value: "age" }]

export default function OutputColumns({ columns = defaultColumns, activeColumns = [], onClick }) {
    return (
        <div className="flex w-full gap-1 pb-2 space-between">
            <div className="flex">
            {columns.map(({ label, value }, index) => {
                return (
                    <div
                    key={index}
                    onClick={() => onClick(value)}
                    className={`
                        flex cursor-pointer items-center ml-[4px] 
                        border border-gray-300 px-2 py-1 rounded-sm
                        ${activeColumns.includes(value) ? 'bg-blue-600 text-[#fff]' : 'bg-gray-100 text-gray-800'}
                    `}
                >
                    <div className="text-sm font-medium">{label}</div>
                </div>
                )
                                   
            })}
            </div>
        </div>
    );
}
