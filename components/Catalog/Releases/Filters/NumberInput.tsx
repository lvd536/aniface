interface IProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value?: number;
    name: string;
    id?: string;
    min?: number;
    max?: number;
}
export default function NumberInput({
    name,
    id,
    min,
    max,
    onChange,
    value,
}: IProps) {
    return (
        <>
            {value && (
                <input
                    type="number"
                    name={name}
                    id={id || name}
                    className="flex items-center justify-center w-20 bg-foreground/10 focus:bg-foreground/15 transition-all outline-none px-3 py-2 rounded-lg text-sm"
                    onChange={onChange}
                    value={value}
                    min={min}
                    max={max}
                />
            )}
        </>
    );
}
