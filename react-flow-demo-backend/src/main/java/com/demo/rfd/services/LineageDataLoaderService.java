package com.demo.rfd.services;

import com.demo.rfd.entities.Asset;
import com.demo.rfd.entities.AssetData;
import com.demo.rfd.entities.AssetDataEdge;
import com.demo.rfd.entities.AssetDataTransformation;
import com.demo.rfd.entities.AssetEdge;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataNodeDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataResponseDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataRowDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataTransformationDto;
import com.demo.rfd.exchanges.response.lineagedata.LineageNodeDataEdgeDto;
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
  private final AssetRepository assetRepository;
  private final EntityToResponseDtoMapperService mapperService;

  @Transactional
  public void loadLatestLineageData(LineageDataResponseDto responseDto) {
    List<Asset> allAssets = assetRepository.findAll();
    for (Asset asset : allAssets) {
      // Data nodes
      LineageDataNodeDto dataNode = mapperService.mapEntityToType(asset, LineageDataNodeDto.class);
      responseDto.addNode(dataNode);
      loadDataRowsNDataRowEdges(responseDto, dataNode, asset);

      // Node Edges
      loadNodeEdges(responseDto, asset);
    }
  }

  private void loadDataRowsNDataRowEdges(LineageDataResponseDto responseDto, LineageDataNodeDto dataNode, Asset asset) {
    List<AssetData> assetDataList = asset.getAssetData();
    for (AssetData assetData : assetDataList) {
      LineageDataRowDto dataRow = mapperService.mapEntityToType(assetData, LineageDataRowDto.class);
      dataNode.addDataRow(dataRow);
      dataRow.setAssetId(assetData.getAssetId());

      // Add transformations to data rows
      loadTransformations(dataRow, assetData);

      // Load data row edges
      loadDataRowEdges(assetData, responseDto);
    }
  }

  private void loadDataRowEdges(AssetData assetData, LineageDataResponseDto responseDto) {
    List<AssetDataEdge> assetDataSourceEdges = assetData.getAssetDataSourceEdges();
    for (AssetDataEdge assetDataEdge : assetDataSourceEdges) {
      LineageNodeDataEdgeDto dataEdge = new LineageNodeDataEdgeDto();
      dataEdge.setSource(String.valueOf(assetDataEdge.getSource().getId()));
      dataEdge.setTarget(String.valueOf(assetDataEdge.getTarget().getId()));
      dataEdge.setSourceHandle(assetDataEdge.getSourceHandle());
      dataEdge.setTargetHandle(assetDataEdge.getTargetHandle());
      dataEdge.setId(String.format("ed-%s-%s", dataEdge.getSourceHandle(), dataEdge.getTargetHandle()));
      responseDto.addNodeDataEdge(dataEdge);
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

  private void loadNodeEdges(LineageDataResponseDto responseDto, Asset asset) {
    List<AssetEdge> assetEdges = new ArrayList<>(asset.getAssetSourceEdges());
    for (AssetEdge assetEdge : assetEdges) {
      LineageNodeEdgeDto nodeEdge = new LineageNodeEdgeDto();
      nodeEdge.setSource(String.valueOf(assetEdge.getSource().getId()));
      nodeEdge.setTarget(String.valueOf(assetEdge.getTarget().getId()));
      nodeEdge.setSourceHandle(String.format("%s-source", nodeEdge.getSource()));
      nodeEdge.setId(String.format("en-s%s-t%s-id%s", nodeEdge.getSource(), nodeEdge.getTarget(), assetEdge.getId()));
      responseDto.addNodeEdge(nodeEdge);
    }
  }
}
