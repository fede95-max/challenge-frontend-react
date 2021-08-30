import { useEffect, useState } from "react";
import FlatList from "flatlist-react";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { useSearchSuperHeroServices } from "../../hooks/superHeroServices";
import LottieIcon from "./../../components/LottieIcon";
import ErrorImage from "../../components/ErrorImage";
import { SaveStorage, ReadStorage } from "../../utils/AsyncStorage";
import "./styles.css";

const SearchSuperHero = () => {
  const [search, setSearch] = useState(null);
  const [teamHeros, setTeamHero] = useState([]);
  const { data: heros, error } = useSearchSuperHeroServices(search);
  useEffect(() => {
    ReadStorage("Team")
      .then((result) => setTeamHero(JSON.parse(result) || []))
      .catch(() => {});
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setSearch(values.name);
    },
  });

  const existHeroTeam = (id) => {
    return teamHeros.find((hero) => hero.id === id);
  };
  const AddHeroTeam = async (hero) => {
    if (!!existHeroTeam(hero.id)) {
      const newTeam = teamHeros.filter((h) => h.id !== hero.id);
      setTeamHero(newTeam);
      await SaveStorage("Team", JSON.stringify(newTeam));
    } else {
      const newTeam = [...teamHeros, hero];
      await SaveStorage("Team", JSON.stringify(newTeam));
      setTeamHero(newTeam);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>Agregar Personaje</h2>
      </div>
      <div className=" offset-xl-2 offset-lg-2 offset-md-2 offset-sm-2 offset-xs-2 mb-2">
        <div className="d-flex flex-wrap">
          {teamHeros.length > 0 &&
            teamHeros.map((item) => (
              <div className="m-2">
                <Button
                  style={{
                    backgroundColor:
                      item.biography.alignment === "bad" ? "red" : "blue",
                  }}
                  onClick={() => AddHeroTeam(item)}
                >
                  <div className={`card card-xs`} style={{ color: "red" }}>
                    <div className=" d-flex flex-column">
                      <ErrorImage url={item.image.url} style={{ height: 80 }} />
                      <div className="mt-2">{item.name}</div>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-end mt-4 mr-5">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Button type="submit">Buscar</Button>
        </div>
      </form>
      {!!search && !!error && (
        <LottieIcon
          alignment={"NoResults"}
          width={400}
          height={350}
          loop={true}
          play={true}
        />
      )}
      <div className="mt-5 d-flex flex-wrap">
        <FlatList
          list={heros}
          renderWhenEmpty={() => <div />}
          renderItem={(item) => (
            <Button
              key={item.id}
              className="btn btn-primary button"
              disabled={
                (
                  teamHeros.filter(
                    (hero) =>
                      hero.biography.alignment === item.biography.alignment
                  ) || []
                ).length >= 3 && !teamHeros.find((hero) => hero.id === item.id)
              }
              onClick={() => AddHeroTeam(item)}
            >
              <div
                className={`card m-2 ${
                  existHeroTeam(item.id) ? "card-activate" : ""
                } `}
              >
                <div className="d-flex justify-content-end ">
                  <LottieIcon alignment={item.biography.alignment} />
                </div>
                <div className=" d-flex flex-column">
                  <ErrorImage
                    url={item.image.url}
                    style={{ width: existHeroTeam(item.id) ? 170 : 150 }}
                  />
                  <div className="mt-2" title="Agregar Personaje">
                    {item.name}
                  </div>
                </div>
              </div>
            </Button>
          )}
        />
      </div>
    </>
  );
};
export default SearchSuperHero;
