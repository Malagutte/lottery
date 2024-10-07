package com.lottery.domain.game;

import com.lottery.domain.dtos.GameDto;
import com.lottery.domain.entities.GameEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper
public interface GameMapper {

    @Mapping(target = "id", ignore = true)
    GameEntity toEntity(GameDto dto);
}
