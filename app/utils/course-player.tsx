import axios from "axios";
import { useEffect, useState } from "react";

interface CoursePlayerProps {
  videoUrl: string;
  title: string;
}

const CoursePlayer = ({ videoUrl, title }: CoursePlayerProps) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=JKk7AqMsjty0UDwG`}
        style={{
          border: 0,
          width: "90%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        allowFullScreen={true}
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
