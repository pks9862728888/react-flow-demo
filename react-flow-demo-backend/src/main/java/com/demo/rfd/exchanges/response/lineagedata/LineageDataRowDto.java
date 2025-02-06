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
  private String id;
  private String key;
  private Integer colSeq;
  private String name;
  private final List<LineageDataTransformationDto> transformations = new ArrayList<>();
  private boolean selected;
  private boolean showViewDetailsHyperlink = true;

  public void addDataTransformation(LineageDataTransformationDto transformationDto) {
    transformations.add(transformationDto);
  }
}
