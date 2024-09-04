import Table from "../../components/Table";

const TableSection = ({ title, data, extractValues }) => (
    <div className="my-3">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
            {title}
        </h1>
        <Table
            columns={Object.keys(data[0] || {})}
            rows={extractValues(data)}
        />
    </div>
);

export default TableSection;
