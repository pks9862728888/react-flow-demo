package com.demo.rfd.exchanges.response.lineagedata;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class LineageDataNodeDto {
  private String name;
  private String version;
  private boolean latest;
  private final List<LineageDataRowDto> dataRows = new ArrayList<>();

  public void addDataRow(LineageDataRowDto dataRow) {
    dataRows.add(dataRow);
  }
}
