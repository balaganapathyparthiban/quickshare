import { AiOutlineInfoCircle, AiOutlineCode } from 'react-icons/ai'

import LinkPng from '../../assets/images/link.png'

const Header: React.FC = () => {
    return (
        <div className="w-full h-8 flex flex-row items-center justify-between">
            <div className="w-auto h-full flex flex-row items-center">
                <img className="w-auto h-full shadow-lg" src={LinkPng} alt="" />
                <p className="text-xl mobile:hidden ml-1">Quick Share</p>
                <p className="text-xl mobile:text-lg hidden mobile:block ml-1">QShare</p>
            </div>
            <div className="w-auto h-full rounded shadow-lg bg-white flex flex-row items-center text-gray-800 px-4 mobile:px-1 py-2">
                <div className="flex flex-row items-center border-r pl-1 pr-2">
                    <AiOutlineInfoCircle />
                    <p className="ml-2 mobile:text-sm">
                        About
                    </p>
                </div>
                <div className="flex flex-row items-center pl-2 pr-1">
                    <AiOutlineCode />
                    <p className="ml-2 mobile:text-sm">
                        Source Code
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header