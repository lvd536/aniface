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
        <div className="flex flex-col gap-12">
            <Franchise franchiseResponse={franchiseList} />
            <div className="flex flex-col gap-4 justify-center p-4 bg-black/40 rounded-xl">
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
