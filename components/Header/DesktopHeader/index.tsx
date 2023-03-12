import Search from "components/Search";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CreateIcon from "public/icons/create-icon.svg";
import ExploreIcon from "public/icons/explore-icon.svg";
import type { FC } from "react";
import UserArea from "../UserArea";

const DesktopHeader: FC = () => {
    const { data } = useSession();
    return (
        <div className="w-full border h-[59px] flex justify-between items-center px-9">
            <div className="w-5/12 flex justify-between items-center">
                <Image
                    src="/icons/favicons/180x180.png"
                    width={40}
                    height={40}
                    alt="Picpath"
                />
                <div className="w-[55%]">
                    <Search />
                </div>
            </div>
            <div className="w-1/5 flex justify-end items-center gap-4">
                <CreateIcon
                    width="40px"
                    onClick={() => alert('add point and share photo || share photo in any point')}
                    className="cursor-pointer"
                />
                <Link href="/explore">
                    <ExploreIcon
                        width="38px"
                        className="cursor-pointer"
                    />
                </Link>
                <UserArea user={{ username: data?.user?.username }} />
            </div>
        </div>
    )
}

export default DesktopHeader