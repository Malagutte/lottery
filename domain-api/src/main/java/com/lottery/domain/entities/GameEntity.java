package com.lottery.domain.entities;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Value;

@Value
@Entity
@Table(
    name = "games",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "game_type_number_unique",
            columnNames = {"type", "number"}
        )
    }
)
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    UUID id;

    @Column(nullable = false)
    String type;

    @Column(nullable = false)
    String number;

    @Column(name = "json_numbers", columnDefinition = "jsonb", nullable = false)
    List<String> jsonNumbers;

    @Column(name = "collected_amount", columnDefinition = "numeric", nullable = false)
    BigDecimal collectedAmount;

    @OneToMany(mappedBy = "game")
    Set<PrizeDistributionEntity> prizesDistribution;
}