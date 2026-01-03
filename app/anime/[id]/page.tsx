interface IProps {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    return <div>page</div>;
}
