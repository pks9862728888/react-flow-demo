package com.demo.rfd.repositories;

import com.demo.rfd.entities.AssetDataEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDataEdgeRepository extends JpaRepository<AssetDataEdge, Long> {
}
