import React, { useState, useEffect } from "react";
import Episodio from "../Episodio";
import api from "../../services/api";

const ModalFilme = () => {
  const [filme, setFilme] = useState({});
  const [episodios, setEpisodios] = useState([]);

  const selectFilmeListener = () => {
    window.addEventListener("selectFilme", (data) => {
      setFilme(data.detail);
    });
  };

  const getEpisodios = async (temporada_id) => {
    try {
      const response = await api.get(`/episodio/temporada/${temporada_id}`);
      const res = response.data;

      if (res.error) {
        alert(res.message);
        return false;
      }

      setEpisodios(res.episodios);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    selectFilmeListener();
  }, []);

  useEffect(() => {
    if (filme.tipo == "Series") {
      getEpisodios(filme?.temporadas[0]?._id);
    }
  }, [filme]);

  return (
    <div class="modal fade" id="modal-filme">
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-hero"
            style={{ backgroundImage: `url(${filme.capa})` }}
          >
            <img src={filme.logo} />
            <div class="modal-hero-infos">
              <button class="btn btn-lg btn-custom-white">
                <span class="mdi mdi-play"></span>Assistir
              </button>
              <a
                href="#"
                class="btn-custom-round btn btn-lg btn-light rounded-circle"
              >
                <span class="mdi mdi-play"></span>
              </a>
              <a
                href="#"
                class="btn-custom-round border-white btn btn-lg rounded-circle opacity-50"
              >
                <span class="mdi mdi-thumb-up text-white"></span>
              </a>
              <a
                href="#"
                class="btn-custom-round border-white btn btn-lg rounded-circle opacity-50"
              >
                <span class="mdi mdi-thumb-down text-white"></span>
              </a>
            </div>
          </div>
          <div class="modal-infos">
            <div class="container">
              <div class="row">
                <div class="col-7">
                  <p class="filme_descricao">{filme.descricao}</p>
                </div>
                <div class="col-5">
                  <p class="filme_elenco">
                    Elenco: <text>{filme.elenco?.join(", ")}</text>
                    Gêneros: <text>{filme.generos?.join(", ")}</text>
                    <br />
                    <br />
                    Cenas e momentos:{" "}
                    <text>{filme.cenas_momentos?.join(", ")}</text>
                  </p>
                </div>
              </div>
              <br />
              {filme.tipo == "Series" && (
                <>
                  <div class="row">
                    <div class="col-7">
                      <h3 class="text-white">Episódios</h3>
                    </div>
                    <div class="col-5 text-right">
                      <select
                        onChange={(e) => {
                          getEpisodios(e.target.value);
                        }}
                        class="form-control"
                      >
                        {filme.temporadas?.map((temporada) => (
                          <option value={temporada._id}>
                            {temporada.titulo}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <ul id="lista_episodios">
                      {episodios.map((episodio) => (
                        <Episodio episodio={episodio} />
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilme;
