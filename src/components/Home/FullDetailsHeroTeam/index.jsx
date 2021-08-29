import ShowWithStyleInfo from "../ShowWithStyleInfo";
const FullDetailsHeroTeam = ({ hero }) => {
  return (
    <div className="ml-2">
      <ShowWithStyleInfo
        label="Nombre completo"
        value={hero.biography.fullName}
      />
      <ShowWithStyleInfo label="Alias" value={hero.biography.aliases[0]} />
      <ShowWithStyleInfo label="Altura" value={hero.appearance.height[1]} />
      <ShowWithStyleInfo label="Peso" value={hero.appearance.weight[1]} />
      <ShowWithStyleInfo
        label="Color de Cabello"
        value={hero.appearance.hairColor}
      />
      <ShowWithStyleInfo
        label="Color de Ojos"
        value={hero.appearance.eyeColor}
      />
    </div>
  );
};
export default FullDetailsHeroTeam;
