
import convertToNumber from "../../constants/ConvertToNumber";
import ShowWithStyleInfo from "./ShowWithStyleInfo";


const ShowPowerstatsHero = ({
  combat,
  durability,
  intelligence,
  power,
  speed,
  strength,
}) => {
  return (
    <div className="ml-2">
      <ShowWithStyleInfo label="Combate" value={convertToNumber(combat)} />
      <ShowWithStyleInfo
        label="Resistencia"
        value={convertToNumber(durability)}
      />
      <ShowWithStyleInfo
        label="Inteligencia"
        value={convertToNumber(intelligence)}
      />
      <ShowWithStyleInfo label="Poder" value={convertToNumber(power)} />
      <ShowWithStyleInfo label="Velocidad" value={convertToNumber(speed)} />
      <ShowWithStyleInfo label="Fuerza" value={convertToNumber(strength)} />
    </div>
  );
};
export default ShowPowerstatsHero;
