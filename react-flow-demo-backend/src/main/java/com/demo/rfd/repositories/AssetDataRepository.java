package com.demo.rfd.repositories;

import com.demo.rfd.entities.AssetData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDataRepository extends JpaRepository<AssetData, Long> {
}
