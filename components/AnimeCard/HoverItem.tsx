interface IProps extends React.PropsWithChildren {
    className?: string;
}

export default function HoverItem({ children, className }: IProps) {
    return (
        <p className={`font-medium bg-indigo-500 p-1 rounded-sm ${className}`}>
            {children}
        </p>
    );
}
