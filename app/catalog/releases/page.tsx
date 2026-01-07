import Releases from "@/components/Catalog/Releases/Releases";
import { getCatalog } from "@/helpers/api";

interface IProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: IProps) {
    const params = await searchParams;
    const page: number = Number(params.page) || 1;
    const animeCatalog = await getCatalog(page);
    return <Releases releasesList={animeCatalog} />;
}
