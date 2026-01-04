import { getRandomFranchises } from "@/helpers/api";
import FranchiseCard from "./FranchiseCard";
export default async function FranchisesList() {
    const franchises = await getRandomFranchises(3);
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            {franchises.map((franchise) => (
                <FranchiseCard key={franchise.id} franchise={franchise} />
            ))}
        </div>
    );
}
