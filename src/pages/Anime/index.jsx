import React, { useState, useEffect } from "react";

import { api } from "../../services/api";
import { useParams, useHistory } from "react-router-dom";
import SwitchTheme from "../../components/SwitchTheme";
import * as S from "./styles";

function Anime() {
  const { id } = useParams();
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
        const { data } = await api.get(`/epis/${id}`);

        console.log(data);
        setEpisodes(data);
      } catch (err) {
        console.log("Err on load episodies", err);
      }
    }

    if (id) {
      getDetails();
      getAllEpisodes();
    }
  }, [id]);

  function handleClickEpisode(video_Id) {
    history.push({
      pathname: `/anime/${id}/episode/${video_Id}`,
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
          <S.DetailsContainer key={item.id}>
            <S.HeaderInfo>
              <S.ImageAnime>
                <img
                  src={`${item.category_image}`}
                  alt={item.category_name}
                />
              </S.ImageAnime>
              <S.Hero>
                <h2>{item.category_name}</h2>
                <span>{item.category_description}</span>

                <S.Footer>
                  <p>
                    <strong>Gênero:</strong> {item.category_genres}
                  </p>
                  <p>
                    <strong>Ano:</strong> {item.ano}
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
