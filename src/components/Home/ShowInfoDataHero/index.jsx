import { Rating } from "@material-ui/core";
import convertToNumber from "../../../utils/ConvertToNumber";
import ShowWithStyleInfo from "../ShowWithStyleInfo";

const ShowInfoDataHero = ({ hero }) => {
  const fullDataHero = AddDataHero(hero);
  const ShowInfoWithStyle = ({ label, value }) => {
    return (
      <div className="d-flex flex-row ">
        <ShowWithStyleInfo label={label} value={value} />
        <Rating
          value={value / 20 / hero.length}
          size={"small"}
          precision={0.2}
        />
      </div>
    );
  };
  return (
    <>
      <h3 className="d-flex justify-content-center">
        Tipo de equipo : {fullDataHero.typeTeam.label}
      </h3>
      <div
        className="offset-xl-4  offset-lg-4 offset-md-3 offset-sm-2 offset-xs-2 mb-2"
        style={{
          backgroundColor: "aqua",
          borderStyle: "solid",
          borderColor: "black",
          boxShadow: "2px 2px 2px 2px black",
          fontSize: 15,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <div className="d-flex flex-wrap ">
          <ShowInfoWithStyle label={"Combate"} value={fullDataHero.combat} />
          <ShowInfoWithStyle
            label={"Resistencia"}
            value={fullDataHero.durability}
          />
          <ShowInfoWithStyle
            label={"Inteligencia"}
            value={fullDataHero.intelligence}
          />
          <ShowInfoWithStyle label={"Poder"} value={fullDataHero.power} />
          <ShowInfoWithStyle label={"Velocidad"} value={fullDataHero.speed} />
          <ShowInfoWithStyle label={"Fuerza"} value={fullDataHero.strength} />
          <ShowWithStyleInfo
            label="Altura"
            value={fullDataHero.average.weight}
          />
          <ShowWithStyleInfo label="Peso" value={fullDataHero.average.height} />
        </div>
      </div>
    </>
  );
};
const AddDataHero = (hero) => {
  let dataHero = {};
  let powerStatshigher = {};
  let average = { height: 0, weight: 0 };
  hero.map(({ powerstats }) => {
    Object.keys(powerstats).map((key) => {
      if (!dataHero[key]) {
        dataHero[key] = convertToNumber(powerstats[key]);
      } else {
        dataHero[key] += convertToNumber(powerstats[key]);
      }
    });
  });

  Object.keys(dataHero).map((key, index) => {
    if (index === 0 || dataHero[key] > powerStatshigher?.value) {
      powerStatshigher = {
        label: key,
        value: dataHero[key],
      };
    }
  });
  dataHero["typeTeam"] = powerStatshigher;

  hero.map(({ appearance }) => {
    average.height += Number(appearance.height[1].replace("cm", ""));
    average.weight += Number(appearance.weight[1].replace("kg", ""));
  });
  average.weight = (average.weight / hero.length).toFixed(0) + " kg";
  average.height = (average.height / hero.length).toFixed(0) + " cm";
  dataHero["average"] = average;
  return dataHero;
};

export default ShowInfoDataHero;
