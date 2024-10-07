package com.lottery.domain.game;

import com.lottery.domain.dtos.GameDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.util.Optional.ofNullable;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService service;
    private final GameMapper mapper;

    @PostMapping
    public ResponseEntity<Void> saveGame(@RequestBody GameDto game) {
        ofNullable(game)
                .map(mapper::toEntity)
                .ifPresent(service::saveGame);

        return status(CREATED).build();
    }

    @GetMapping("/last")
    public ResponseEntity<Integer> getLastGameByType(@RequestParam String type) {
        return ofNullable(type)
                .map(service::getLastGameByType)
                .map(ResponseEntity::ok)
                .orElse(badRequest().build());
    }
}
