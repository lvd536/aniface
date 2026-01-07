interface IProps {
    id: string;
    name?: string;
    placeholder: string;
    onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    className?: string;
}
export default function SearchBar({
    id,
    name,
    placeholder,
    value,
    className,
    onChange,
}: IProps) {
    return (
        <input
            type="search"
            name={name || id}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={`w-full bg-foreground/15 placeholder:font-mono p-2 rounded-lg focus:outline-0 focus:bg-foreground/25 transition-bg duration-300 ${className}`}
        />
    );
}
