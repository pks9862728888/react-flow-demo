package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LineageNodeDataEdgeDto {
  private String id;
  private String source;
  private String target;
  private String sourceHandle;
  private String targetHandle;
}
