import React, { useState, useEffect } from "react";

import { api } from "../../services/api";
import { useParams, useHistory } from "react-router-dom";
import SwitchTheme from "../../components/SwitchTheme";
import * as S from "./styles";

function Anime() {
  const { animeId } = useParams();
  const history = useHistory();

  const [details, setDetails] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getDetails() {
      try {

fetch(encodeURI(`https://tame-cyan-dog-veil.cyclic.app/gogoanime/info/${animeId}`))
  .then(response => response.json())
        .then(data => {
setDetails(data);
})
      } catch (err) {
        console.log("Err on get anime details", err);
      }
    }

    async function getAllEpisodes() {
      try {
fetch(encodeURI(`https://tame-cyan-dog-veil.cyclic.app/gogoanime/info/${animeId}`))
  .then(response => response.json())
        .then(data => {
setDetails(data.episodes);
})
      } catch (err) {
        console.log("Err on load episodies", err);
      }
    }

    if (animeId) {
      getDetails();
      getAllEpisodes();
    }
  }, [id]);

  function handleClickEpisode(videoId) {
    history.push({
      pathname: `/anime/${animeId}/episode/${videoId}`,
    });
  }

  function handleGoBack() {
    history.goBack();
  }

  return (
    <S.Container>
      <SwitchTheme />
      <S.GoBack onClick={handleGoBack}>
        <S.IconGoBack />
      </S.GoBack>
      <S.Page>
        {details?.map((item) => (
          <S.DetailsContainer key={item.animeId}>
            <S.HeaderInfo>
              <S.ImageAnime>
                <img
                  src={`${item.animeImg}`}
                  alt={item.category_name}
                />
              </S.ImageAnime>
              <S.Hero>
                <h2>{item.animeTitle}</h2>
                <span>{item.synopsis}</span>

                <S.Footer>
                  <p>
                    <strong>Gênero:</strong> {item.genres}
                  </p>
                  <p>
                    <strong>Ano:</strong> {item.releaseDate}
                  </p>
                </S.Footer>
              </S.Hero>
            </S.HeaderInfo>
          </S.DetailsContainer>
        ))}

        <S.EpisodesContainer>
          <S.TitleCategory>
            <h2>Episódios</h2>
          </S.TitleCategory>

          <S.ListEpisodes>
            {episodes?.map((item, index) => (
              <S.EpisodeItem
                watched={item.watched}
                key={`video-${item.episodeId}-${index}`}
                onClick={() => handleClickEpisode(item.episodeId)}
              >
                {item.animeTitle}
              </S.EpisodeItem>
            ))}
          </S.ListEpisodes>
        </S.EpisodesContainer>
      </S.Page>
    </S.Container>
  );
}

export default Anime;
