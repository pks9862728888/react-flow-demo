package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class LineageDataDto {
  private String id;
  private String name;
  private boolean expandNode;
  private final List<String> headerColumns = new ArrayList<>();
  private final List<LineageDataRowDto> dataRows = new ArrayList<>();

  public void addHeaderCols(String... headerCols) {
    this.headerColumns.addAll(List.of(headerCols));
  }

  public void addDataRow(LineageDataRowDto dataRowDto) {
    dataRows.add(dataRowDto);
  }
}
