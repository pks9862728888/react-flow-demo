package com.demo.rfd.services;

import com.demo.rfd.entities.Asset;
import com.demo.rfd.entities.AssetData;
import com.demo.rfd.entities.AssetDataEdge;
import com.demo.rfd.entities.AssetDataTransformation;
import com.demo.rfd.entities.AssetEdge;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageFieldEdgeDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageNodeDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageResponseDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataRowDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataTransformationDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageNodeEdgeDto;
import com.demo.rfd.repositories.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LineageDataLoaderService {
  public static final String TABLE_NODE = "tableNode";
  private final AssetRepository assetRepository;
  private final EntityToResponseDtoMapperService mapperService;

  @Transactional
  public void loadLatestLineageData(LineageResponseDto responseDto) {
    List<Asset> allAssets = assetRepository.findAll();
    for (Asset asset : allAssets) {
      // Data nodes
      LineageNodeDto dataNode = mapperService.mapEntityToType(asset, LineageNodeDto.class);
      responseDto.addNode(dataNode);
      dataNode.setType(TABLE_NODE);
      addAssetData(dataNode, asset);
      loadDataRowsNDataRowEdges(responseDto, dataNode, asset);

      // Node Edges
      loadNodeEdges(responseDto, asset);
    }
  }

  private void addAssetData(LineageNodeDto dataNode, Asset asset) {
    // data
    LineageDataDto data = new LineageDataDto();
    dataNode.setData(data);
    data.setId(String.valueOf(asset.getId()));
    data.setName(asset.getName());
    data.addHeaderCols("Field Name", "Transformations");
  }

  private void loadDataRowsNDataRowEdges(LineageResponseDto responseDto, LineageNodeDto dataNode, Asset asset) {
    List<AssetData> assetDataList = asset.getAssetData();
    int colSeq = 0;
    for (AssetData assetData : assetDataList) {
      // dataRows
      LineageDataRowDto dataRow = mapperService.mapEntityToType(assetData, LineageDataRowDto.class);
      dataNode.getData().addDataRow(dataRow);
      dataRow.setColSeq(colSeq++);

      // Add transformations to data rows
      loadTransformations(dataRow, assetData);

      // Load data row edges
      loadDataRowEdges(assetData, responseDto);
    }
  }

  private void loadDataRowEdges(AssetData assetData, LineageResponseDto responseDto) {
    List<AssetDataEdge> assetDataSourceEdges = assetData.getAssetDataSourceEdges();
    for (AssetDataEdge assetDataEdge : assetDataSourceEdges) {
      LineageFieldEdgeDto dataEdge = new LineageFieldEdgeDto();
      dataEdge.setSource(String.valueOf(assetDataEdge.getSource().getId()));
      dataEdge.setTarget(String.valueOf(assetDataEdge.getTarget().getId()));
      dataEdge.setSourceHandle(assetDataEdge.getSourceHandle());
      dataEdge.setTargetHandle(assetDataEdge.getTargetHandle());
      dataEdge.setId(String.format("ed-%s-%s", dataEdge.getSourceHandle(), dataEdge.getTargetHandle()));
      responseDto.addEdge(dataEdge);
    }
  }

  private void loadTransformations(LineageDataRowDto dataRow, AssetData assetData) {
    List<AssetDataTransformation> assetDataTransformations = assetData.getAssetDataTransformations();
    for (AssetDataTransformation transformation : assetDataTransformations) {
      LineageDataTransformationDto transformationDto = mapperService.mapEntityToType(
          transformation, LineageDataTransformationDto.class);
      dataRow.addDataTransformation(transformationDto);
    }
  }

  private void loadNodeEdges(LineageResponseDto responseDto, Asset asset) {
    List<AssetEdge> assetEdges = new ArrayList<>(asset.getAssetSourceEdges());
    for (AssetEdge assetEdge : assetEdges) {
      LineageNodeEdgeDto nodeEdge = new LineageNodeEdgeDto();
      nodeEdge.setSource(String.valueOf(assetEdge.getSource().getId()));
      nodeEdge.setTarget(String.valueOf(assetEdge.getTarget().getId()));
      nodeEdge.setSourceHandle(String.format("%s-source", nodeEdge.getSource()));
      nodeEdge.setId(String.format("en-s%s-t%s-id%s", nodeEdge.getSource(), nodeEdge.getTarget(), assetEdge.getId()));
      responseDto.addEdge(nodeEdge);
    }
  }
}
