import NavItems from "@/components/Notebook/NavItems";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex max-md:flex-col w-full h-full md:justify-between gap-2">
            <NavItems
                className="flex flex-wrap text-xs items-center gap-2 md:hidden w-full h-fit justify-between rounded-lg py-2 px-5 bg-foreground/10"
                itemsClassName="flex h-10 items-center"
            />
            <div className="w-7/10 lg:w-8/10 max-md:w-full h-8/10 rounded-lg p-2 bg-foreground/15 overflow-y-auto">
                {children}
            </div>
            <NavItems className="flex flex-col gap-2 max-md:hidden w-3/10 lg:w-2/10 h-fit rounded-lg p-2 bg-foreground/10" />
        </div>
    );
}
