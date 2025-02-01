"use client";
import React, {ReactElement} from "react";
import styles from './TableName.module.css';
import {Handle, Position} from "@xyflow/react";
import {TableNodeDataType} from "@/app/types/tablenode/TableNodeDataType";
import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";
import getEdgeHandleKey from "@/app/functions/tablenode/getEdgeHandleKey";
import {DASH_SOURCE, DASH_TARGET} from "@/app/constants/appStringConstants";
import getEdgeHandleKeyPrefix from "@/app/functions/tablenode/getEdgeHandleKeyPrefix";

const fixedHeightFromTop: number = 80;
const heightBetweenTwoRows: number = 20;
const transformationRuleHeight: number = 12;

const TableNode = ({data}: { data: TableNodeDataType }): ReactElement => {
  const triggerNodeSelection = (dataRowId: string) => {
    if (data.triggerNodeSelection) {
      data.triggerNodeSelection({nodeId: data.id, dataRowId: dataRowId});
    } else {
      console.error("No triggerNodeSelection function found, data: ", data);
    }
  }
  let transformationRuleAdjustedDelta: number = 0;
  // Cache is for storing height,
  // Reason is while html rendering both right and left handle
  // should contribute to transformationRuleRowsCount only once
  const heightMapCache: Map<string, number> = new Map<string, number>();
  const calculateHeightFromTopForHandle = (dataRow: TableNodeDataRow): number => {
    const handleKey: string = getEdgeHandleKeyPrefix(data.id, dataRow.id);
    if (!heightMapCache.has(handleKey)) {
      // Calculate value from top of table
      const top: number = fixedHeightFromTop + // fixed height from top
        dataRow.colSeq * heightBetweenTwoRows + // adjustment for padding between two rows
        transformationRuleAdjustedDelta; // adjustment for multiple rows
      heightMapCache.set(handleKey, top);
      // Update transformationRuleAdjustedDelta due to extra space occupied by transformations
      let transformationRuleRowsCount: number =
        dataRow.transformations?.length > 0 ? (dataRow.transformations.length - 1) : 0;
      transformationRuleAdjustedDelta = transformationRuleAdjustedDelta + transformationRuleRowsCount * transformationRuleHeight;
    }
    return heightMapCache.get(handleKey) as number;
  }
  return (
    <div>
      {/*Left handle to connect to previous node*/}
      <Handle
        id={data.id + "-" + "target"}
        type="target"
        position={Position.Left}
        isConnectable={true}
        className={styles.tableConnectorLocation}
      />
      <div className={styles.dataSetContainer}>
        <div className={styles.assetName}>{data.datasetName}</div>
        <div className={styles.table}>
          <div className={styles.row}>
            {data.headerColumns?.map((headerCol: string) => (
              <div key={headerCol} className={styles.header}>{headerCol}</div>
            ))}
          </div>
          {data.dataRows?.map((dataRow: any) => (
            <div key={dataRow.id}
                 className={`${styles.row} ${dataRow.selected ? styles.rowSelected : ''}`}
                 onClick={() => triggerNodeSelection(dataRow.id)}>
              <Handle
                id={getEdgeHandleKey(data.id, dataRow.id, DASH_TARGET)}
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={{top: calculateHeightFromTopForHandle(dataRow)}}
              />
              <div className={styles.cell}>{dataRow.fieldName}</div>
              <div className={styles.cell}>
                <ul>
                  {dataRow.transformations?.map((transformation: any) => (
                    <li key={"li-dId" + data.id + "-drId-" + dataRow.id + "-tId-" + transformation.id}
                        className={styles.li}>
                      <a href="#" key={transformation.ruleId}
                         className={styles.transformationRuleHyperlink}>{transformation.ruleId}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <Handle
                id={getEdgeHandleKey(data.id, dataRow.id, DASH_SOURCE)}
                type="source"
                position={Position.Right}
                isConnectable={true}
                style={{top: calculateHeightFromTopForHandle(dataRow)}}
              />
            </div>
          ))}
        </div>
        {/*Right handle to connect to next node*/}
        <Handle
          id={data.id + "-" + "source"}
          type="source"
          position={Position.Right}
          isConnectable={true}
          className={styles.tableConnectorLocation}
        />
      </div>
    </div>
  );
}

export default TableNode;
