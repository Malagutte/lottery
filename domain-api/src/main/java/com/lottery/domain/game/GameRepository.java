package com.lottery.domain.game;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.lottery.domain.entities.GameEntity;

@Repository
public interface GameRepository extends CrudRepository<GameEntity, UUID>,
        PagingAndSortingRepository<GameEntity, UUID> {

}