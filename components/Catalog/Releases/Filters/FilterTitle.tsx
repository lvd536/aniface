import { PropsWithChildren } from "react";

export default function FilterTitle({ children }: PropsWithChildren) {
    return <h3 className="text-sm font-medium">{children}</h3>;
}
