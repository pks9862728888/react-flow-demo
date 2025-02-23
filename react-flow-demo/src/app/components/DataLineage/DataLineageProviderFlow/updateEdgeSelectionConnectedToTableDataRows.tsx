import {Edge} from "@xyflow/react";
import {cloneDeep} from "lodash";
import extractKeyFromEdgeHandle from "@/app/functions/tablenode/getKeyFromEdgeHandle";
import {selectedEdgeStyle} from "@/app/constants/selectedEdgeStyle";
import {unSelectedEdgeStyle} from "@/app/constants/unSelectedEdgeStyle";

const updateEdgeSelectionConnectedToTableDataRows =
  (oldEdge: Edge, lineageData: Set<string>): Edge => {
    // Only tableRows will have both sourceHandle and targetHandle populated
    // So update the edges which are connected to table row
    if (oldEdge.sourceHandle && oldEdge.targetHandle) {
      let newEdge: Edge = cloneDeep(oldEdge);
      // Update selected flag and style based on whether edge is selected or not
      newEdge.selected = lineageData.has(extractKeyFromEdgeHandle(oldEdge.sourceHandle)) &&
        lineageData.has(extractKeyFromEdgeHandle(oldEdge.targetHandle));
      newEdge.style = newEdge.selected ? selectedEdgeStyle : unSelectedEdgeStyle;
      return newEdge;
    }
    return oldEdge;
  }

export default updateEdgeSelectionConnectedToTableDataRows;
