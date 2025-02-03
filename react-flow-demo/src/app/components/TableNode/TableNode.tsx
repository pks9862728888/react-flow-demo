"use client";
import React, {ReactElement} from "react";
import styles from './TableName.module.css';
import {Handle, Position} from "@xyflow/react";
import {TableNodeDataType} from "@/app/types/tablenode/TableNodeDataType";
import {TableNodeDataRow} from "@/app/types/tablenode/TableNodeDataRow";
import getEdgeHandleKey from "@/app/functions/tablenode/getEdgeHandleKey";
import {DASH_SOURCE, DASH_TARGET} from "@/app/constants/appStringConstants";
import getEdgeHandleKeyPrefix from "@/app/functions/tablenode/getEdgeHandleKeyPrefix";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const fixedHeightFromTop: number = 103;
const heightBetweenTwoRows: number = 20;
const transformationRuleHeight: number = 12;

const TableNode = ({data}: { data: TableNodeDataType }): ReactElement => {
  const triggerNodeSelection = (dataRowId: string) => {
    data.triggerNodeSelection?.({nodeId: data.id, dataRowId: dataRowId});
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
      transformationRuleAdjustedDelta = transformationRuleAdjustedDelta +
        transformationRuleRowsCount * transformationRuleHeight;
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
        <div className={styles.assetName}>{data.name}</div>
        <div className={`${styles.fieldsCount} ${styles.cursorPointer}`}
             onClick={() => data.triggerNodeExpansionToggle?.(!data.expandNode)}
             role="Toggle table node expansion">
          <span className={styles.iconShowOrCollapse}>{data.expandNode ? <FaChevronUp/> : <FaChevronDown/>}</span>
          {data.dataRows ? data.dataRows.length : 0} fields
        </div>
        {/*Table starts here, show only when its in expanded mode*/}
        {data.expandNode && <div className={styles.table}>
          <div className={styles.row}>
            {data.headerColumns?.map((headerCol: string) => (
              <div key={headerCol} className={styles.header}>{headerCol}</div>
            ))}
          </div>
          {data.dataRows?.map((dataRow: any) => (
            <div key={dataRow.id}
                 className={`${styles.row} ${dataRow.selected ? styles.rowSelected : ''} ${styles.cursorPointer}`}
                 onClick={() => triggerNodeSelection(dataRow.id)}
                 role="Trigger data lineage field highlight">
              {/*Left handle for dataRow*/}
              <Handle
                id={getEdgeHandleKey(data.id, dataRow.id, DASH_TARGET)}
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={{top: calculateHeightFromTopForHandle(dataRow)}}
              />
              <div className={styles.cell}>{dataRow.name}</div>
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
              {/*Right handle for dataRow*/}
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
        }
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
