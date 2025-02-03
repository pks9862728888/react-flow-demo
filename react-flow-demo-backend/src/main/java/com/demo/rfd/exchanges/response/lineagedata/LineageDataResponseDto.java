package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class LineageDataResponseDto {
  private final List<LineageDataNodeDto> nodes = new ArrayList<>();
  private final List<LineageNodeEdgeDto> nodeEdges = new ArrayList<>();
  private final List<LineageNodeDataEdgeDto> nodeDataEdges = new ArrayList<>();

  public void addNode(LineageDataNodeDto node) {
    nodes.add(node);
  }

  public void addNodeEdge(LineageNodeEdgeDto nodeEdge) {
    nodeEdges.add(nodeEdge);
  }

  public void addNodeDataEdge(LineageNodeDataEdgeDto dataEdge) {
    nodeDataEdges.add(dataEdge);
  }
}
