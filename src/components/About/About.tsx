import { RiCloseFill } from "react-icons/ri";

interface IAbout {
  open: boolean;
  close: () => void;
}

const About: React.FC<IAbout> = (props) => {
  if (!props.open) return null;
  return (
    <div className="w-scree absolute top-0 bottom-0 left-0 right-0 z-10 h-screen bg-white text-gray-800">
      <div
        className="flex h-auto w-full cursor-pointer items-center justify-between border-b-2 p-4 mobile:p-2"
        onClick={props.close}
      >
        <p className="text-2xl">About</p>
        <RiCloseFill className="text-3xl" />
      </div>
      <div className="p-4 mobile:p-2">
        <p>About</p>
      </div>
    </div>
  );
};

export default About;
