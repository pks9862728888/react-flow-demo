package com.demo.rfd.cache;

import com.demo.rfd.exchanges.response.lineagedata.LineageResponseDto;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class LineageDataCache {

  private final Map<String, LineageResponseDto> lineageDataCache = new HashMap<>();

  public void updateCache(String version, LineageResponseDto lineageDataRes) {
    lineageDataCache.put(version, lineageDataRes);
  }

  public boolean isDataAvailableInCache(String version) {
    return lineageDataCache.containsKey(version);
  }

  public LineageResponseDto getFromCache(String version) {
    return lineageDataCache.get(version);
  }
}
