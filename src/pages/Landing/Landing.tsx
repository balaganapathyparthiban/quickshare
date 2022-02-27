import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import DataTransferPng from "../../assets/images/datatransfer.png";
import ShareForm from "../../components/ShareForm/ShareForm";

const Landing: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col bg-gray-800 text-white">
      <div className="px-6 py-4 mobile:px-2 mobile:py-2 tablet:px-4 laptop:px-6">
        <Header />
      </div>
      <div className="flex h-[calc(100%-5rem)] w-full flex-row overflow-hidden px-6 py-6 mobile:flex-col-reverse mobile:px-2 mobile:py-2 tablet:px-4 tablet:py-4 laptop:px-6 laptop:py-4">
        <div className="h-full w-2/5 rounded-lg bg-white p-6 text-gray-800 shadow-lg mobile:w-full mobile:p-4 tablet:w-2/5 tablet:p-4 laptop:w-2/5 laptop:p-4">
          <ShareForm />
        </div>
        <div className="h-full w-3/5 px-12 mobile:hidden mobile:w-full mobile:px-2 tablet:w-3/5 tablet:px-4 laptop:w-4/5 laptop:px-8">
          <p className="text-6xl font-semibold">Quick Share</p>
          <p className="mt-4 text-4xl">
            Send Large Files Free - Fast Secure File Transfer
          </p>
          <p className="mt-4 text-2xl text-gray-200">
            Share large files up to 1 GB using a secure link
          </p>
          <div className="h-auto w-full">
            <img
              className="h-auto w-auto mobile:hidden"
              src={DataTransferPng}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-2">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
