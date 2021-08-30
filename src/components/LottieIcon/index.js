import Lottie from "react-lottie";
import SuperHeroHome from "../../Lotties/SuperHeroHome.json";
import SuperHero from "../../Lotties/SuperHero.json";
import Evil from "../../Lotties/Evil.json";
import NoResults from "../../Lotties/NoResults.json";

const Luttie = ({
  alignment,
  height = 35,
  width = 50,
  loop = false,
  play = false,
}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: play,
    animationData:
      alignment === "good"
        ? SuperHero
        : alignment === "HeroHome"
        ? SuperHeroHome
        : alignment === "NoResults"
        ? NoResults
        : Evil,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default Luttie;
