import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCloudDownload, MdOutlineCloudUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface DragInputProps {
  setUploadImages: (file: any) => void;
  uploadImage: any;
}

const ImageInput = ({ setUploadImages, uploadImage }: DragInputProps) => {
  const [error, setError] = useState("");
  const [fileEnter, setFileEnter] = useState(false);

  const checkFiles = (files: any) => {
    // Check file formats
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = files.filter(
      (file: any) => !allowedFormats.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setError("Only PNG, JPG, and JPEG file formats are allowed.");
      return false;
    }

    setError(""); // Clear any previous error message
    return true;
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: any) => {
    const files = Array.from(e.target.files);
    if (checkFiles(files)) {
      const base64 = await convertToBase64(files[0] as File);
      setUploadImages(base64);
    }
  };

  const handleFileDrop = async (e: any) => {
    e.preventDefault();
    setFileEnter(false);
    const files = Array.from(e.dataTransfer.files);
    if (checkFiles(files)) {
      const base64 = await convertToBase64(files[0] as File);
      setUploadImages(base64);
    }
  };

  return (
    <div
      className={`flex flex-col w-4/5 aspect-square relative border-2 rounded-xl justify-center items-center ${fileEnter ? "border-solid" : "border-dashed"}`}
    >
      {uploadImage ? (
        <div className="w-full aspect-square flex items-center justify-between rounded-xl">
          <Image
            src={uploadImage}
            alt="upload-image"
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-xl"
          />
          <div
            className="top-2 right-2 z-10 absolute bg-white rounded-full p-[2px] cursor-pointer hover:bg-white/50"
            onClick={() => setUploadImages("")}
          >
            <IoClose />
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center flex-col px-10 gap-4"
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            handleFileDrop(e);
          }}
        >
          {fileEnter ? (
            <>
              <MdOutlineCloudDownload size={100} className="opacity-40" />
              <div className="opacity-40 flex flex-col">
                <label htmlFor="file" className="text-[18px] leading-[150%]">
                  Drag and drop or click to upload
                </label>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="file" className="flex flex-col items-center">
                <MdOutlineCloudUpload size={100} className="opacity-40" />
                <a className="text-[#5D5D5B] text-[14px] leading-[150%]">{`PNG, JPG, JPEG file formats only. Maximum file size 100 Mb.`}</a>
              </label>
            </>
          )}
          <input
            id="file"
            type="file"
            className="w-full h-full hidden cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      )}
      {error && (
        <p style={{ color: "red" }} className="absolute bottom-2 left-10">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageInput;
