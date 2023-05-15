import React, { useState, useEffect } from "react";

import { api } from "../../services/api";
import { useParams, useHistory } from "react-router-dom";

import * as S from "./styles";

function Watch() {
  const { videoId } = useParams();
  const history = useHistory();

  const [currentEpisode, setCurrentEpisode] = useState([]);

  useEffect(() => {
    async function getCurrentEpisode() {
      try {
        const { data } = await api.get(`/watch/${episodeId}`);
        console.log(data);
        setCurrentEpisode(data);
      } catch (err) {
        console.log("Err on load current episode", err);
      }
    }

    if (videoId) {
      getCurrentEpisode();
    }
  }, [videoId]);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <S.Container>
      {currentEpisode?.map((item) => (
        <S.VideoWrapper key={`episode-${item.episodeId}`}>
          <video
            src={item.link[0].file}
            controls
          />
          <span onClick={handleGoBack}>Voltar</span>
          //<S.Name>{item.animeTitle}</S.Name>
        </S.VideoWrapper>
      ))}
    </S.Container>
  );
}

export default Watch;
