import Select, { MultiValue, SingleValue } from "react-select";

interface Option {
    label: string;
    value: string;
}

interface IProps {
    isMulti: boolean;
    name: string;
    options?: Option[];
    value?: Option | Option[] | null;
    placeholder: string;
    onChange: (newValue: MultiValue<Option> | SingleValue<Option>) => void;
}

export default function CustomSelect({
    name,
    value,
    options,
    isMulti,
    placeholder,
    onChange,
}: IProps) {
    return (
        <Select
            isMulti={isMulti}
            name={name}
            options={options}
            value={value}
            unstyled
            placeholder={placeholder}
            className="my-2"
            classNames={{
                control: ({ isFocused }) =>
                    `flex rounded-lg ${
                        isFocused ? "bg-foreground/15" : "bg-foreground/10"
                    } border-2 transition-all border-none p-1`,
                menu: () =>
                    "bg-stone-800 mt-2 rounded-lg border border-stone-700 overflow-hidden shadow-xl",
                option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer transition-colors ${
                        isSelected
                            ? "bg-indigo-600 text-white"
                            : isFocused
                            ? "bg-stone-700 text-indigo-400"
                            : "text-stone-300"
                    }`,

                multiValue: () =>
                    "bg-stone-700 rounded-md mr-1 p-1 flex items-center",
                multiValueLabel: () => "text-stone-200 text-xs px-1",
                multiValueRemove: () =>
                    "text-stone-400 hover:text-red-400 hover:bg-stone-600 rounded-sm ml-1 transition-all",
                noOptionsMessage: () => "p-4 text-stone-500",
                placeholder: () => "text-stone-500 ml-2",
                input: () => "text-white ml-2",
                dropdownIndicator: () =>
                    "text-stone-500 hover:text-stone-300 px-2",
                indicatorsContainer: () => "gap-1",
            }}
            onChange={onChange}
        />
    );
}
