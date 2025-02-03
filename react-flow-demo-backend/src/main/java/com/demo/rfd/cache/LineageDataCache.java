package com.demo.rfd.cache;

import com.demo.rfd.exchanges.response.lineagedata.LineageDataResponseDto;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class LineageDataCache {

  private final Map<String, LineageDataResponseDto> lineageDataCache = new HashMap<>();

  public void updateCache(String version, LineageDataResponseDto lineageDataRes) {
    lineageDataCache.put(version, lineageDataRes);
  }

  public boolean isDataAvailableInCache(String version) {
    return lineageDataCache.containsKey(version);
  }

  public LineageDataResponseDto getFromCache(String version) {
    return lineageDataCache.get(version);
  }
}
