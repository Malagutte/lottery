package com.lottery.domain.entities;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Value;

@Value
@Entity
@Table(
    name = "prizes_distribution",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "tier_game_id_unique",
            columnNames = {"tier", "game_id"}
        )
    }
)
public class PrizeDistributionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    UUID id;

    @Column
    Integer tier;

    @Column(name = "number_of_winners", nullable = false)
    Integer numberOfWinners;

    @Column(name = "prize_amount", columnDefinition = "numeric", nullable = false)
    BigDecimal prizeAmount;

    @Column(name = "tier_description")
    String tierDescription;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    GameEntity game;
}
