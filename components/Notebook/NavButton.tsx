import Link from "next/link";

interface IProps extends React.PropsWithChildren {
    route: string;
    isActive: boolean;
    className?: string;
}

export default function NavButton({
    route,
    isActive,
    children,
    className,
}: IProps) {
    return (
        <Link
            href={route}
            className={`p-2 bg-foreground/15 rounded-lg transition-ring duration-300 ${className} ${
                isActive && "ring-1 ring-indigo-600"
            }`}
        >
            {children}
        </Link>
    );
}
