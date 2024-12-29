import React, { useState } from 'react'
import axios from "axios";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export default function PageTesting() {

  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (files) => {
    if (files[0]) {
      const file = files[0];
      setSelectedFile(file);
      // 創建預覽 URL
      console.log(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = () => {

    if (!selectedFile) {
      alert("請先選擇一張圖片！");
      return;
    }

    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "cloudineer");
    formData.append("cloud_name", "duco3iisc")

    axios
      .post("https://api.cloudinary.com/v1_1/duco3iisc/image/upload", formData)
      .then((response) => {
        setImage(response.data.url);
        console.log(response);
        console.log(response.data.url);
      })
      .catch((error) => {
        console.error("上傳圖片時發生錯誤：", error);
      });
  };
  
  return (
    <div className='flex flex-col items-center justify-center min-h-800px'>
      {/* 圖片預覽區域 */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="預覽圖片"
          className="max-h-96 max-w-96"
        />
      )}
      <div className='flex flex-row items-center justify-center h-32'>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={(e) => handleFileChange(e.target.files)}/>
        <button className="btn btn-outline btn-primary ml-6" onClick={uploadImage}>上傳圖片</button>
      </div>
      
    </div>
  );
}
