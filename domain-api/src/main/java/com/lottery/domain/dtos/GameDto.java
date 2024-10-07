package com.lottery.domain.dtos;

import lombok.Value;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Value
public class GameDto {
    String type;
    String number;
    List<String> jsonNumbers;
    BigDecimal collectedAmount;
    Set<PrizeDistributionDto> prizesDistribution;
}
