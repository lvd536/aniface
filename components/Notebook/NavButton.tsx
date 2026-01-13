import Link from "next/link";

interface IProps extends React.PropsWithChildren {
    route: string;
    className?: string;
}

export default function NavButton({ route, children, className }: IProps) {
    return (
        <Link
            href={route}
            className={
                `p-2 bg-foreground/15 rounded-lg transition-ring duration-300 ` +
                className
            }
        >
            {children}
        </Link>
    );
}
