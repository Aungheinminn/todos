import Lottie from "react-lottie-player";
import loadingAnimation from "@/lottle/loading.json";

const MutateLoading = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return (
    <Lottie
      loop
      animationData={loadingAnimation}
      play
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default MutateLoading;

