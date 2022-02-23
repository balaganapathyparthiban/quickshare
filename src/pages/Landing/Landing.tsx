import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import DataTransferPng from '../../assets/images/datatransfer.png'
import ShareForm from "../../components/ShareForm/ShareForm"

const Landing: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-800 text-white">
            <div className="px-6 py-4">
                <Header />
            </div>
            <div className="w-full h-[calc(100%-5rem)] overflow-hidden px-6 py-6 flex flex-row">
                <div className="w-2/5 h-full bg-white text-gray-800 shadow-lg rounded-lg p-6">
                    <ShareForm />
                </div>
                <div className="w-4/5 h-full px-12">
                    <p className="text-6xl">Quick Share</p>
                    <p className="mt-4 text-4xl">Send Large Files Free - Fast Secure File Transfer</p>
                    <p className="mt-4 text-2xl text-gray-200">Share large files up to 1 GB using a secure link</p>
                    <div className="w-full h-auto">
                        <img className="w-auto h-auto" src={DataTransferPng} alt="" />
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