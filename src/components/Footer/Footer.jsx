import FooterCard from "../Other/FooterCard";
import { explores, supports } from "../Other/footerlinks";
import { CiInstagram } from "react-icons/ci";
import { LiaFacebookSquare } from "react-icons/lia";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-col px-8 pt-5">
      <div className="w-full grid grid-cols-3 gap-[30rem]">
        <FooterCard title="Explore" lists={explores} />
        <FooterCard title="Support" lists={supports} />
        <div className="flex flex-col items-end gap-4">
          <h4 className="font-semibold">Stay connected</h4>
          <div className="flex gap-2">
            <CiInstagram />
            <LiaFacebookSquare />
            <RiTwitterXLine />
          </div>
        </div>
      </div>
      <h4 className="text-lg font-bold text-center font-poppins">
        DEV@Deakin 2024
      </h4>
      <ul className="flex items-center mt-2 mb-5 justify-evenly font-poppins">
        <li>
          <h6>Privacy Policy</h6>
        </li>
        <li>
          <h6>Terms</h6>
        </li>
        <li>
          <h6>Code of Conduct</h6>
        </li>
        <li>
          <h6 className="text-sm font-silk">By Zamin Ahmadi.</h6>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
