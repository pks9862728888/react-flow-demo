package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class LineageDataRowDto {
  private Long id;
  private Long assetId;
  private String fieldName;
  private String key;
  private final List<LineageDataTransformationDto> transformations = new ArrayList<>();

  public void addDataTransformation(LineageDataTransformationDto transformationDto) {
    transformations.add(transformationDto);
  }
}
