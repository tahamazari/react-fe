import { XMarkIcon } from "@heroicons/react/24/solid"; // Using Heroicons for cross icon (optional)

export default function Badge({ label = "text", className, icon, onClick }) {
    return (
        <span className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${className}`}>
            {label}
            {icon && (
                <button className="ml-2 text-gray-600 hover:text-red-600" onClick={onClick}>
                    <XMarkIcon className="w-4 h-4" />
                </button>
            )}
        </span>
    );
}