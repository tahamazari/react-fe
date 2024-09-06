import { XMarkIcon } from "@heroicons/react/24/solid";

export default function OutputColumns({ columns = ["name", "date", "age"], removeColumn }) {
    return (
        <div className="flex gap-1 border-b-2 border-gray-300 pb-2">
            {columns.map((item, index) => (
                <div key={index} className="flex items-center bg-gray-100 border border-gray-300 text-gray-800 px-2 py-1 rounded-sm">
                    <div className="text-sm font-medium">{item}</div>
                    <div className="pl-1">
                        <XMarkIcon
                            className="cursor-pointer h-3 w-3 text-gray-500 hover:text-red-500 transition-colors duration-200"
                            onClick={() => removeColumn(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
