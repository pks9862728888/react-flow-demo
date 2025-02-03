package com.demo.rfd.services;

import com.demo.rfd.cache.LineageDataCache;
import com.demo.rfd.exchanges.response.lineagedata.LineageDataResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Slf4j
@Service
@RequiredArgsConstructor
public class LineageDataService {
  public static final String LATEST = "latest";

  private final LineageDataCache lineageDataCache;
  private final LineageDataLoaderService lineageDataLoader;

  @PostConstruct
  public void loadCacheWithLatestLineageData() {
    log.info("Warming cache with latest lineageData...");
    try {
      LineageDataResponseDto lineageDataResponseDto = new LineageDataResponseDto();
      lineageDataLoader.loadLatestLineageData(lineageDataResponseDto);
      lineageDataCache.updateCache(LATEST, lineageDataResponseDto);
      log.info("Cache warmed: for key: {} value: {}", LATEST, lineageDataResponseDto);
    } catch (Exception e) {
      e.printStackTrace();
      log.error("Exception while warming cache: {}", e.getMessage());
    }
  }

  public LineageDataResponseDto getLatestLineageData() {
    return lineageDataCache.getFromCache(LATEST);
  }
}
