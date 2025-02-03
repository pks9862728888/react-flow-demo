DO
$$
    BEGIN
        INSERT INTO core.asset
        VALUES ('1', 'RawData', NOW(), NOW()),
               ('2', 'JsonData', NOW(), NOW()),
               ('3', 'CDM', NOW(), NOW()),
               ('4', 'ASIC Data Model', NOW(), NOW()),
               ('5', 'MAS Data Model', NOW(), NOW());

        INSERT INTO core.asset_data
        VALUES ('1', '1', 'fieldAN1', '1-1', NOW(), NOW()),
               ('2', '1', 'fieldAN2', '1-2', NOW(), NOW()),
               ('3', '2', 'fieldBN1', '2-3', NOW(), NOW()),
               ('4', '2', 'fieldBN2', '2-4', NOW(), NOW()),
               ('5', '2', 'fieldBN3', '2-5', NOW(), NOW()),
               ('6', '3', 'fieldCN1', '3-6', NOW(), NOW()),
               ('7', '3', 'fieldCN2', '3-7', NOW(), NOW()),
               ('8', '4', 'fieldDN1', '4-8', NOW(), NOW()),
               ('9', '4', 'fieldDN2', '4-9', NOW(), NOW()),
               ('10', '5', 'fieldEN1', '5-10', NOW(), NOW()),
               ('11', '5', 'fieldEN2', '5-11', NOW(), NOW()),
               ('12', '5', 'fieldEN3', '5-12', NOW(), NOW());

        INSERT INTO core.asset_data_transformation
        VALUES ('1', '1', '1', 'TRNS_RULE_001', 'trade.abc', 'ENRICHMENT', NOW(), NOW()),
               ('2', '1', '2', 'TRNS_RULE_002', 'trade.abc', 'ENRICHMENT', NOW(), NOW()),
               ('3', '2', '3', 'JSON_RATES_001', 'trade.abc', 'JSON', NOW(), NOW()),
               ('4', '2', '3', 'JSON_RATES_003', 'trade.abc', 'JSON', NOW(), NOW()),
               ('5', '2', '5', 'TRNS_RULE_001', 'trade.abc', 'JSON', NOW(), NOW()),
               ('6', '3', '6', 'HarmonizedField001', 'trade.abc', 'HRF', NOW(), NOW());

        INSERT INTO core.asset_edge
        VALUES ('1', '1', '2', NOW(), NOW()),
               ('2', '2', '3', NOW(), NOW()),
               ('3', '3', '4', NOW(), NOW()),
               ('4', '3', '5', NOW(), NOW());

        INSERT INTO core.asset_data_edge
        VALUES ('1', '1', '2', '1', '3', now(), now()),
               ('2', '1', '2', '2', '4', now(), now()),
               ('3', '2', '3', '3', '6', now(), now()),
               ('4', '2', '3', '3', '7', now(), now()),
               ('5', '2', '3', '5', '6', now(), now()),
               ('6', '3', '4', '6', '8', now(), now()),
               ('7', '3', '5', '6', '10', now(), now());

    END
$$;

