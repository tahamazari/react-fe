import { Badge } from "../../components";

const FilterBadge = ({ filter }) => {
    return (
        <div className="pt-2">
            <Badge label={filter.join(" ")} />
        </div>
    );
};

export default FilterBadge;
