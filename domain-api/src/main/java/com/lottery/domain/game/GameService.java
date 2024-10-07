package com.lottery.domain.game;

import com.lottery.domain.entities.GameEntity;

public interface GameService {

    void saveGame(GameEntity game);

    // Page<GameEntity> getGamesByTypePaginated(SearchRequestEntity searchRequest);

    Integer getLastGameByType(String type);

}
