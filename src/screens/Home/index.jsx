import { useState, useEffect } from "react";
import Button from "@restart/ui/esm/Button";
import { Trash } from "react-bootstrap-icons";
import { ReadStorage, SaveStorage } from "../../utils/AsyncStorage";
import ErrorImage from "../../components/ErrorImage";
import FullDetailsHeroTeam from "../../components/Home/FullDetailsHeroTeam";
import ShowInfoDataHero from "../../components/Home/ShowInfoDataHero";
import ShowPowerstatsHero from "../../components/Home/ShowPowerstatsHero";

import Dialog from "../../components/Dialog";
import LottieIcon from "./../../components/LottieIcon";

const Home = () => {
  const [equip, setEquip] = useState([]);
  const [props, setProps] = useState({
    title: "",
    description: "",
    footer: "",
    show: false,
  });

  useEffect(() => {
    ReadStorage("Team")
      .then((result) => {
        setEquip(JSON.parse(result) || []);
      })
      .catch(() => console.log("error"));
  }, []);

  const deleteHeroTeam = async (id) => {
    const newTeam = equip.filter((item) => item.id !== id);
    await SaveStorage("Team", JSON.stringify(newTeam));
    setEquip(newTeam);
  };

  return (
    <>
      <h2 className="d-flex justify-content-center">Equipo</h2>
      {!!equip && equip.length > 0 && <ShowInfoDataHero hero={equip} />}
      <div className="container d-flex flex-wrap" style={{ maxWidth: "80%" }}>
        {!!equip && equip.length > 0 ? (
          equip.map((item) => (
            <>
              <div className="card m-2" style={{ minWidth: 300 }}>
                <div className="d-flex flex-row justify-content-between mb-2">
                  <LottieIcon alignment={item.biography.alignment} />
                  <div className="">
                    <Trash
                      onClick={() => {
                        setProps({
                          title: "",
                          type: "delete",
                          item,
                          description: `Quieres eliminar a
                           ${item.name}
                          de su equipo?`,
                          show: true,
                        });
                      }}
                      size="1.3em"
                      color="#4d92e3"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <Button
                  key={item.id}
                  className="btn btn-primary button justify-content-center "
                  onClick={() => {
                    setProps({
                      type: "details",
                      item,
                      title: item.name,
                      image: item.image.url,
                      show: true,
                    });
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-beetween">
                      <div className=" d-flex flex-column">
                        <ErrorImage url={item.image.url} />
                        <div className="mt-2" title="Agregar Personaje">
                          {item.name}
                        </div>
                      </div>
                      <ShowPowerstatsHero {...item.powerstats} />
                    </div>
                  </div>
                </Button>
              </div>
            </>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <h5>
              Aun no tienes un equipo, Armalo
              <a href="/SearchSuperHero">
                <b> Aqui </b>
              </a>
            </h5>
          </div>
        )}
      </div>
      <Dialog
        show={props.show}
        title={props.title}
        description={props.description}
        footer={props.footer}
        yesNoButton={props.type === "delete"}
        onPressYes={() => {
          deleteHeroTeam(props.item.id);
          setProps({ ...props, show: false });
        }}
        onPressNo={() => setProps({ ...props, show: false })}
        onDismiss={() => setProps({ ...props, show: false })}
      >
        {!!props && props?.type === "details" && (
          <div className="d-flex justify-content-beetween">
            <div className="ml-3">
              <ErrorImage url={props.image} />
            </div>
            <FullDetailsHeroTeam hero={props.item} />
          </div>
        )}
      </Dialog>
    </>
  );
};

export default Home;
