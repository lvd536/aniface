interface IProps extends React.PropsWithChildren {
    className?: string;
    separatingCircle?: boolean;
}

export default function HoverItem({
    children,
    className,
    separatingCircle,
}: IProps) {
    return (
        <>
            <p className={`font-medium p-1 rounded-sm ${className}`}>
                {children}
            </p>
            {separatingCircle && (
                <span className="w-1 h-1 mx-1 bg-gray-300 rounded-full" />
            )}
        </>
    );
}
