import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { RiLockLine } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";

const Download = () => {
  const { file } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [fileInfo, setFileInfo] = useState<{
    expired: string;
    isPasswordProtected: boolean;
    message: string;
    title: string;
    name: string;
    size: string;
  }>();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/file/info?id=${file}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw "Invalid file/expired";
      })
      .then((response) => {
        setFileInfo({ ...response });
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const calculateFileSize = (size: number) => {
    if (size >= 1000000000) {
      return `${Math.round(size / 1000000000)} GB`;
    } else if (size >= 1000000) {
      return `${Math.round(size / 1000000)} MB`;
    } else if (size >= 1000) {
      return `${Math.round(size / 1000)} KB`;
    } else {
      return `${size} bytes`;
    }
  };

  const handlerFileDownload = () => {
    fetch(
      `${
        import.meta.env.VITE_SERVER_ENDPOINT
      }/api/file/download?id=${file}&password=${password}`
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw "Invalid password";
            return;
          }
          throw "Server error";
          return;
        }
        const reader = response.body?.getReader();
        let fileLength = 0;

        return new ReadableStream({
          start(controller) {
            return pump();
            function pump(): any {
              if (!reader) return pump();

              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }

                if (value?.length && fileInfo?.size) {
                  fileLength += value?.length;
                  setProgress(
                    Math.round((fileLength / parseInt(fileInfo?.size)) * 100)
                  );
                }

                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileInfo?.name || "";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  if (loading) {
    return (
      <div>
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gray-800 text-white">
      <div className="px-6 py-4 mobile:px-2 mobile:py-2">
        <Header />
      </div>
      <div className="flex h-[calc(100%-5rem)] w-full flex-row items-center justify-center overflow-hidden px-6 py-6 mobile:px-2 mobile:py-2">
        <div className="flex h-3/4 w-3/5 flex-col rounded-lg bg-white px-4 text-gray-800 shadow-lg mobile:h-auto mobile:w-full mobile:px-2">
          <div className="flex h-full w-full flex-row">
            <div className="h-full w-2/5 border-r py-4 pr-2">
              <div
                className="flex h-auto w-full cursor-pointer flex-row items-center"
                onClick={() => navigate("/")}
              >
                <MdOutlineArrowBackIos className="text-xl text-gray-800" />
                <p className="mx-2 text-lg text-gray-800">Home</p>
              </div>
              <div className="h-auto w-full">
                <div className="mt-4 text-sm">
                  <span className="text-gray-400">Name</span>
                  <p className="break-words">{fileInfo?.name}</p>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-gray-400">Size</span>
                  <p className="break-words">
                    {calculateFileSize(
                      fileInfo?.size ? parseInt(fileInfo.size) : 0
                    )}
                  </p>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-gray-400">Title</span>
                  <p className="break-words">{fileInfo?.title}</p>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-gray-400">Message</span>
                  <p className="h-1/3 overflow-y-auto overflow-x-hidden break-words">
                    {fileInfo?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-auto w-3/5 py-4">
              {progress ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="py-4 text-xl">Downloading</p>
                  <div className="h-auto w-1/2">
                    <CircularProgressbar
                      className="h-full w-full"
                      value={progress}
                      maxValue={1}
                      text={`${progress}%`}
                    />
                  </div>
                  {progress === 100 ? (
                    <div
                      className="my-2 cursor-pointer rounded-full bg-gray-400 px-4 py-2 text-white"
                      onClick={() => setProgress(0)}
                    >
                      <p>Close</p>
                    </div>
                  ) : null}
                </div>
              ) : fileInfo && fileInfo.name ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <AiOutlineDownload className="text-9xl text-gray-800" />
                  {fileInfo?.isPasswordProtected ? (
                    <div className="my-2 w-4/5">
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Enter password"
                        className="w-full rounded-lg border px-4 py-1 outline-none mobile:text-sm"
                      />
                    </div>
                  ) : null}
                  <div
                    className="flex w-4/5 cursor-pointer flex-row items-center justify-center rounded-full bg-gray-400 px-4 py-2 text-white"
                    onClick={handlerFileDownload}
                  >
                    <p className="px-2">Download</p>
                    {fileInfo?.isPasswordProtected ? <RiLockLine /> : null}
                  </div>
                  <p className="mt-2 text-xs">
                    <span className="px-1 text-gray-400">Expire @</span>
                    <span className="text-gray-400">
                      {fileInfo?.expired
                        ? new Date(fileInfo?.expired).toLocaleString()
                        : ""}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <p className="text-2xl text-gray-400">Invalid file/expired</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-2">
        <Footer />
      </div>
    </div>
  );
};

export default Download;
