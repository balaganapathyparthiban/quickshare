import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import DataTransferPng from '../../assets/images/datatransfer.png'
import ShareForm from "../../components/ShareForm/ShareForm"

const Landing: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 text-white">
            <div className="px-6 mobile:px-2 tablet:px-4 laptop:px-6 py-4 mobile:py-2">
                <Header />
            </div>
            <div className="w-full h-[calc(100%-5rem)] overflow-hidden px-6 mobile:px-2 tablet:px-4 laptop:px-6 py-6 mobile:py-2 tablet:py-4 laptop:py-4 flex flex-row mobile:flex-col-reverse">
                <div className="w-2/5 mobile:w-full tablet:w-2/5 laptop:w-2/5 h-full bg-white text-gray-800 shadow-lg rounded-lg p-6 mobile:p-4 tablet:p-4 laptop:p-4">
                    <ShareForm />
                </div>
                <div className="w-3/5 mobile:w-full tablet:w-3/5 laptop:w-4/5 h-full px-12 mobile:px-2 tablet:px-4 laptop:px-8 mobile:hidden">
                    <p className="text-6xl font-semibold">Quick Share</p>
                    <p className="mt-4 text-4xl">Send Large Files Free - Fast Secure File Transfer</p>
                    <p className="mt-4 text-2xl text-gray-200">Share large files up to 1 GB using a secure link</p>
                    <div className="w-full h-auto">
                        <img className="w-auto h-auto mobile:hidden" src={DataTransferPng} alt="" />
                    </div>
                </div>
            </div>
            <div className="px-6 py-2">
                <Footer />
            </div>
        </div>
    )
}

export default Landing