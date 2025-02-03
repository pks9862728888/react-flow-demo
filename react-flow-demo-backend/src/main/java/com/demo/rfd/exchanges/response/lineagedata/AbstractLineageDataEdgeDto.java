package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AbstractLineageDataEdgeDto {
  private String id;
  private String source;
  private String target;
  private boolean selected;
}
