import Releases from "@/components/Catalog/Releases/Releases";

interface IProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: IProps) {
    const params = await searchParams;
    const page: number = Number(params.page) || 1;
    return <Releases page={page} />;
}
