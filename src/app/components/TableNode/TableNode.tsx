"use client";
import React, {ReactElement} from "react";
import styles from './TableName.module.css';
import {Handle, Position} from "@xyflow/react";

const TableNode = ({data}: { data: any }): ReactElement => {
  return (
    <div>
      {/*Left handle to connect to previous node*/}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
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
            <div key={dataRow.id} className={styles.row}>
              <div className={styles.cell}>{dataRow.fieldName}</div>
              <div className={styles.cell}>
                {dataRow.transformations?.map((transformation: any) => (
                  <a href="#" key={transformation.ruleId}
                     className={styles.transformationRuleHyperlink}>{transformation.ruleId}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/*Right handle to connect to next node*/}
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={true}
        />
      </div>
    </div>
  );
}

export default TableNode;
