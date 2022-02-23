import { AiOutlineInfoCircle, AiOutlineCode } from 'react-icons/ai'

import LinkPng from '../../assets/images/link.png'

const Header: React.FC = () => {
    return (
        <div className="w-full h-8 flex flex-row items-center justify-between">
            <div className="w-auto h-full flex flex-row items-center">
                <img className="w-auto h-full" src={LinkPng} alt="" />
                <p className="text-xl ml-1">Quick Share</p>
            </div>
            <div className="w-auto h-full rounded shadow-lg bg-white flex flex-row items-center text-gray-800 px-4 py-2">
                <div className="flex flex-row items-center border-r px-2">
                    <AiOutlineInfoCircle />
                    <p className="ml-2">
                        About
                    </p>
                </div>
                <div className="flex flex-row items-center px-2">
                    <AiOutlineCode />
                    <p className="ml-2">
                        Source Code
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header