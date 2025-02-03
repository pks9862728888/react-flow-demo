package com.demo.rfd.controllers;

import com.demo.rfd.exchanges.response.lineagedata.LineageResponseDto;
import com.demo.rfd.services.LineageDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/lineage-data")
@RequiredArgsConstructor
public class LineageDataController {
  private final LineageDataService lineageDataService;

  @GetMapping("/latest")
  public ResponseEntity<LineageResponseDto> getLineageData() {
    return new ResponseEntity<>(lineageDataService.getLatestLineageData(), HttpStatus.OK);
  }
}
