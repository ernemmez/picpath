
import type { FC } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileNavbar from "./MobileNavbar";
import { IHeader } from "./types";

const Header: FC<IHeader> = ({ isMobile }) => {

    return isMobile ? <MobileNavbar /> : <DesktopHeader />;
}

export default Header