import Search from "components/Search";
import Image from "next/image";
import CreateIcon from "public/icons/create-icon.svg";
import ExploreIcon from "public/icons/explore-icon.svg";
import type { FC } from "react";
import UserArea from "../UserArea";

const DesktopHeader: FC = () => {

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
                <ExploreIcon
                    width="38px"
                    onClick={() => alert('explore')}
                    className="cursor-pointer"
                />

                <UserArea />
            </div>
        </div>
    )
}

export default DesktopHeader