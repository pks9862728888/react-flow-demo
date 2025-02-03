package com.demo.rfd.repositories;

import com.demo.rfd.entities.AssetEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetEdgeRepository extends JpaRepository<AssetEdge, Long> {
}
