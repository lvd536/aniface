interface IProps extends React.PropsWithChildren {
    separatingCircle?: boolean;
}
export default function FranchiseDetailsItem({
    separatingCircle,
    children,
}: IProps) {
    return (
        <>
            <p className="text-xs text-foreground/60 font-medium">{children}</p>
            {separatingCircle && (
                <span className="w-1 h-1 mx-1 bg-gray-300 rounded-full" />
            )}
        </>
    );
}
