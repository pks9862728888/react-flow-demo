import {Handle, Position} from "@xyflow/react";
import getEdgeHandleKey from "@/app/functions/tablenode/getEdgeHandleKey";
import {DASH_SOURCE, DASH_TARGET} from "@/app/constants/appStringConstants";
import React, {useState} from "react";
import {TableDataRowPropType} from "@/app/types/proptypes/TableDataRowPropType";
import ViewTableFieldDetailDialog from "@/app/components/ViewTableFieldDetailDialog/ViewTableFieldDetailDialog";
import styles from './TableNode.module.css';
import stylesTdr from './TableDataRow.module.css';

const TableDataRow: React.FC<TableDataRowPropType> = ({
                                                        dataRow,
                                                        triggerNodeSelection,
                                                        dataId,
                                                        calculateHeightFromTopForHandle
                                                      }: TableDataRowPropType) => {
  const [showAssetFieldDetailDialog, setShowAssetFieldDetailDialog] = useState(false);
  return (<div key={dataRow.id}
               className={`${styles.row} ${dataRow.selected ? styles.rowSelected : ''} ${styles.cursorPointer}`}
               onClick={() => triggerNodeSelection(dataRow.id)}
               role="Trigger data lineage field highlight">
    {/*Left handle for dataRow*/}
    <Handle
      id={getEdgeHandleKey(dataId, dataRow.id, DASH_TARGET)}
      type="target"
      position={Position.Left}
      isConnectable={true}
      style={{top: calculateHeightFromTopForHandle(dataRow)}}
    />
    <div className={styles.cell}>{dataRow.name}</div>
    <div className={styles.cell}>
      {dataRow.showViewDetailsHyperlink &&
        <span onClick={() => setShowAssetFieldDetailDialog(true)}
              className={stylesTdr.viewDetails}>View Details...</span>}
      {/*<ul>*/}
      {/*  {dataRow.transformations?.map((transformation: any) => (*/}
      {/*    <li key={"li-dId" + dataId + "-drId-" + dataRow.id + "-tId-" + transformation.id}*/}
      {/*        className={styles.li}>*/}
      {/*      <a href="#" key={transformation.ruleId}*/}
      {/*         className={styles.transformationRuleHyperlink}>{transformation.ruleId}</a>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
    {/*Right handle for dataRow*/}
    <Handle
      id={getEdgeHandleKey(dataId, dataRow.id, DASH_SOURCE)}
      type="source"
      position={Position.Right}
      isConnectable={true}
      style={{top: calculateHeightFromTopForHandle(dataRow)}}
    />
    {/* Dialog to show detail view */}
    {showAssetFieldDetailDialog && <ViewTableFieldDetailDialog
      openViewDetails={showAssetFieldDetailDialog}
      title={dataRow.name}
      assetId={"1"}
      revision={"1"}
      closeDialog={() => setShowAssetFieldDetailDialog(false)}/>}
  </div>);
};

export default TableDataRow;