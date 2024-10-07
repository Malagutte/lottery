package com.lottery.domain.game;

import com.lottery.domain.entities.GameEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final GameRepository repository;

    @Override
    @Async
    public void saveGame(GameEntity game) {
        repository.save(game);
    }

    @Override
    public Integer getLastGameByType(String type) {
        return 0;
    }
}
