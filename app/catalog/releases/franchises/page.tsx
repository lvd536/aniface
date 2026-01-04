import FranchiseCard from "@/components/Home/Lists/Franchise/FranchiseCard";
import { getAllFranchises } from "@/helpers/api";

export default async function page() {
    const franchisesList = await getAllFranchises();
    return (
        <div className="flex flex-wrap gap-2">
            {franchisesList.map((franchise) => (
                <FranchiseCard key={franchise.id} franchise={franchise} />
            ))}
        </div>
    );
}
