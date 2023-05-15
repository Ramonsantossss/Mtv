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
        const { data } = await api.get(`/info/${id}`);
        setDetails(data);
      } catch (err) {
        console.log("Err on get anime details", err);
      }
    }

    async function getAllEpisodes() {
      try {
        const { data } = await api.get(`/epis/${animeId}`);

        console.log(data);
        setEpisodes(data);
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
                  alt={item.animeTitle}
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
                key={`video-${item.video_id}-${index}`}
                onClick={() => handleClickEpisode(item.video_id)}
              >
                {item.title}
              </S.EpisodeItem>
            ))}
          </S.ListEpisodes>
        </S.EpisodesContainer>
      </S.Page>
    </S.Container>
  );
}

export default Anime;
