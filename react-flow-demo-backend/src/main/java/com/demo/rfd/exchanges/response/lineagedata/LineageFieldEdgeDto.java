package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LineageFieldEdgeDto extends AbstractLineageDataEdgeDto {
  private String sourceHandle;
  private String targetHandle;
}
