import { PropsWithChildren } from "react";

export default function FilterDescription({ children }: PropsWithChildren) {
    return <p className="text-xs text-foreground/30">{children}</p>;
}
