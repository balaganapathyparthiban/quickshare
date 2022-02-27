import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { MdOutlineArrowBackIos, MdOutlineCopyAll } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";

const ShareForm = () => {
  const copyTextRef = useRef<HTMLParagraphElement>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [progress, setProgress] = useState("");
  const [fileId, setFileId] = useState("");
  const [fileExpired, setFileExpired] = useState("");

  const handlerCheckPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.checked);
  };

  const handlerFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile("");
    setProgress("");

    if (!event.target.files) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0].name);
        setProgress("0");
        axios
          .post(
            `${import.meta.env.VITE_SERVER_ENDPOINT}/api/file/upload?size=${
              event.target.files[0].size
            }&name=${
              event.target.files[0].name
            }&title=${title}&message=${message}&password=${password}`,
            reader.result,
            {
              onUploadProgress: (progressEvent) => {
                setProgress(
                  `${Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  )}`
                );
              },
            }
          )
          .then((response) => {
            setFileId(response.data.file_id);
            setFileExpired(response.data.expired);
            toast.success("File uploaded successfully");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    };

    reader.readAsArrayBuffer(event.target.files[0]);
  };

  const handlerDeleteFile = () => {
    setSelectedFile("");
    setProgress("");
    setFileId("");
    setFileExpired("");
    (document.getElementById("uploadfile") as any).value = null;
  };

  const copyClipboard = () => {
    if (copyTextRef.current) {
      navigator.clipboard.writeText(copyTextRef.current.innerText);
      toast.info("Link copied");
    }
  };

  return (
    <div className="w-full h-full">
      {selectedFile && progress ? (
        <div className="w-full h-auto">
          <div
            className="w-full h-auto flex flex-row items-center cursor-pointer"
            onClick={handlerDeleteFile}
          >
            <MdOutlineArrowBackIos className="text-xl text-gray-800" />
            <p className="mx-2 text-lg text-gray-800">Back</p>
          </div>
          <div className="h-40 mt-12">
            <CircularProgressbar
              className="w-full h-full"
              value={parseInt(progress)}
              maxValue={1}
              text={`${progress}%`}
            />
          </div>
          <div className="mt-6">
            <div className="select-text text-sm">
              <span className="font-semibold">Sharable file link:</span>
              <MdOutlineCopyAll
                className="text-gray-800 text-xl inline-block cursor-pointer"
                onClick={copyClipboard}
              />
              <p
                ref={copyTextRef}
              >{`https://${window.location.host}/${fileId}`}</p>
            </div>
            <div className="select-text text-sm mt-4">
              <span className="font-semibold">Link expired at:</span>
              <p>{fileExpired ? new Date(fileExpired).toISOString() : ""}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-auto flex flex-col items-center">
          <div className="mt-4 mobile:mt-2 tablet:mt-2 laptop:mt-2 mb-2 w-full h-auto">
            <p className="text-center text-4xl mobile:text-xl tablet:text-2xl laptop:text-3xl font-semibold">
              Upload & Create a sharable link.
            </p>
          </div>
          <div className="mt-6 mobile:mt-2 tablet:mt-4 laptop:mt-4 w-full h-auto">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              className="w-full h-auto border-2 border-gray-200 rounded px-4 py-2 outline-none"
              placeholder="Title"
              maxLength={30}
            />
          </div>
          <div className="mt-4 w-full h-auto">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              className="w-full h-auto border-2 border-gray-200 rounded px-4 py-2 outline-none"
              placeholder="Message"
              maxLength={100}
            />
          </div>
          <div className="mt-4 w-full h-auto flex flex-row items-center cursor-pointer">
            <input
              id="passwordCheckbox"
              type="checkbox"
              checked={checkPassword}
              onChange={handlerCheckPassword}
            />
            <label htmlFor="passwordCheckbox" className="ml-2">
              Secure with password
            </label>
          </div>
          <div className="mt-4 w-full h-auto">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              style={{
                background: !checkPassword ? "#cccccc50" : "transparent",
              }}
              disabled={!checkPassword}
              className="w-full h-auto border-2 border-gray-200 rounded px-4 py-2 outline-none"
              placeholder="Password"
            />
            <span className="text-sm text-gray-600 mt-2 inline-block">
              Only person with password can able to download resource.
            </span>
          </div>
          <div className="mt-6 tablet:mt-2 laptop:mt-2 mb-4 tablet:mb-0 laptop:mb-0 w-full">
            <label
              htmlFor="uploadfile"
              className="cursor-pointer flex flex-row items-center justify-center border-2 border-gray-800 rounded px-4 py-2"
            >
              <RiAddCircleFill className="text-3xl text-gray-800" />
              <span className="ml-2 text-2xl text-gray-800 font-semibold">
                Upload File
              </span>
            </label>
            <input
              className="hidden"
              type="file"
              id="uploadfile"
              name="uploadfile"
              onChange={handlerFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareForm;
