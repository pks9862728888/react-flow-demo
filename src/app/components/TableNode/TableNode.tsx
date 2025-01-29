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
        <table className={styles.styledTable}>
          <thead>
          <tr>
            {data.headerColumns?.map((headerCol: string) => (
              <th key={headerCol}>{headerCol}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.dataRows?.map((dataRow: any) => (
            <tr key={dataRow.id}>
              <td>{dataRow.fieldName}</td>
              <td>
                {dataRow.transformations?.map((transformation: any) => (
                  <a href="#" key={transformation.ruleId}
                     className={styles.transformationRuleHyperlink}>{transformation.ruleId}</a>
                ))}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
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
