"use client";
import React, {ReactElement} from "react";
import styles from './TableName.module.css';
import {Handle, Position} from "@xyflow/react";

const TableNode = ({data}: { data: any }): ReactElement => {
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
            <div key={dataRow.id} className={styles.row}>
              <Handle
                id={data.id + "-" + dataRow.id + "-target"}
                type="target"
                position={Position.Left}
                isConnectable={true}
                style={{top: 92 + dataRow.colSeq * 35}}
              />
              <div className={styles.cell}>{dataRow.fieldName}</div>
              <div className={styles.cell}>
                {dataRow.transformations?.map((transformation: any) => (
                  <li key={"li-dId" + data.id + "-drId-" + dataRow.id + "-tId-" + transformation.id}
                    className={styles.li}>
                    <a href="#" key={transformation.ruleId}
                       className={styles.transformationRuleHyperlink}>{transformation.ruleId}</a>
                  </li>
                ))}
              </div>
              <Handle
                id={data.id + "-" + dataRow.id + "-source"}
                type="source"
                position={Position.Right}
                isConnectable={true}
                style={{top: 92 + dataRow.colSeq * 35}}
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
