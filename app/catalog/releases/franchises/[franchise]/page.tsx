import Franchise from "@/components/Catalog/Franchises/Franchise";
import FranchiseTitle from "@/components/Catalog/Franchises/FranchiseTitle";
import { getFranchise } from "@/helpers/api";

interface IProps {
    params: Promise<{ franchise: string }>;
}

export default async function page({ params }: IProps) {
    const { franchise } = await params;
    const franchiseList = await getFranchise(franchise);
    return (
        <div className="flex flex-col gap-6">
            <Franchise franchiseResponse={franchiseList} />
            <div className="flex flex-col gap-2 justify-center bg-black/40 p-2 rounded-lg">
                {franchiseList.franchise_releases.map((franchise) => (
                    <FranchiseTitle
                        key={franchise.id}
                        franchise={franchise.release}
                    />
                ))}
            </div>
        </div>
    );
}
