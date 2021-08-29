import Lottie from "react-lottie";

import SuperHero from "../../Lotties/SuperHero.json";
import Evil from "../../Lotties/Evil.json";

const Luttie = ({ alignment }) => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: alignment === "good" ? SuperHero : Evil,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={35} width={50} />
    </div>
  );
};

export default Luttie;
