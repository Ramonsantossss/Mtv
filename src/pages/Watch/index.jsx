import React, { useState, useEffect } from "react";

import { api } from "../../services/api";
import { useParams, useHistory } from "react-router-dom";

import * as S from "./styles";

function Watch() {
  const { video_id } = useParams();
  const history = useHistory();

  const [currentEpisode, setCurrentEpisode] = useState([]);

  useEffect(() => {
    async function getCurrentEpisode() {
      try {
        const { data } = await api.get(`/watch/${video_id}`);
        console.log(data);
        setCurrentEpisode(data);
      } catch (err) {
        console.log("Err on load current episode", err);
      }
    }

    if (video_id) {
      getCurrentEpisode();
    }
  }, [video_id]);

  function handleGoBack() {
    history.goBack();
  }
  const { aniii } = await api.get(`/watch/${video_id}`);
  return (
    <S.Container>
          <video
            src={`${aniii.link}`}
          />
    </S.Container>
  );
}
     //     <S.Name>{item.title}</S.Name>
     //         <S.VideoWrapper key={`episode-${item.video_id}`}>
     //         </S.VideoWrapper>
     /*
           {currentEpisode?.map((item) => (
                 ))}
                           <span onClick={handleGoBack}>Voltar</span>
     */

export default Watch;
