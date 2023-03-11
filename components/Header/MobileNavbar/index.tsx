import CreateIcon from "public/icons/create-icon.svg";
import ExploreIcon from "public/icons/explore-icon.svg";
import HomepageIcon from "public/icons/mobile-homepage.svg";
import UserIcon from "public/icons/user-icon-desktop.svg";
import type { FC } from "react";

const MobileNavbar: FC = () => {

    return (
        <div className="border max-h-[100px] w-full absolute bottom-0 flex justify-around items-center px-[60px] py-[12px]">
            <HomepageIcon
                width="34px"
                onClick={() => alert('route homepage')}
                className="cursor-pointer"
            />
            <ExploreIcon
                width="34px"
                onClick={() => alert('route explore page')}
                className="cursor-pointer"
            />
            <CreateIcon
                width="34px"
                onClick={() => alert('add point and share photo || share photo in any point')}
                className="cursor-pointer"
            />
            <UserIcon
                width="34px"
                onClick={() => alert('open user dropdown')}
                className="cursor-pointer"
            />
        </div>
    )
}

export default MobileNavbar