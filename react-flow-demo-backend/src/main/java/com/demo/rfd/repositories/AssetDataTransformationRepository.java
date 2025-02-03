package com.demo.rfd.repositories;

import com.demo.rfd.entities.AssetDataTransformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetDataTransformationRepository extends JpaRepository<AssetDataTransformation, Long> {
}
