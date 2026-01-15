import Link from "next/link";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
    route: string;
}
export default function ProfileButton({ route, children }: IProps) {
    return <Link href={route}>{children}</Link>;
}
