package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class LineageResponseDto {
  private final List<LineageNodeDto> nodes = new ArrayList<>();
  private final List<AbstractLineageDataEdgeDto> edges = new ArrayList<>();

  public void addNode(LineageNodeDto node) {
    nodes.add(node);
  }

  public void addEdge(AbstractLineageDataEdgeDto nodeEdge) {
    edges.add(nodeEdge);
  }
}
