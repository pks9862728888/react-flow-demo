DO
$$
    BEGIN
        CREATE TABLE core.asset
        (
            id      SERIAL PRIMARY KEY,
            name    VARCHAR(255) NOT NULL,
            created TIMESTAMP    NOT NULL,
            updated TIMESTAMP    NOT NULL
        );

        CREATE TABLE core.asset_data
        (
            id         SERIAL PRIMARY KEY,
            asset_id   INT REFERENCES asset (id),
            field_name VARCHAR(255) NOT NULL,
            key        VARCHAR(255) NOT NULL,
            created    TIMESTAMP    NOT NULL,
            updated    TIMESTAMP    NOT NULL
        );

        CREATE TABLE core.asset_data_transformation
        (
            id            SERIAL PRIMARY KEY,
            asset_id      INT REFERENCES asset (id),
            asset_data_id INT REFERENCES asset_data (id),
            rule_id       VARCHAR(255) NOT NULL,
            rule          TEXT         NOT NULL,
            type          VARCHAR(255) NOT NULL,
            created       TIMESTAMP    NOT NULL,
            updated       TIMESTAMP    NOT NULL
        );

        CREATE TABLE core.asset_edge
        (
            id      SERIAL PRIMARY KEY,
            source  INT REFERENCES asset (id) NOT NULL,
            target  INT REFERENCES asset (id) NOT NULL,
            created TIMESTAMP                    NOT NULL,
            updated TIMESTAMP                    NOT NULL
        );

        CREATE TABLE core.asset_data_edge
        (
            id        SERIAL PRIMARY KEY,
            source    INT REFERENCES asset (id)      NOT NULL,
            target    INT REFERENCES asset (id)      NOT NULL,
            source_id INT REFERENCES asset_data (id) NOT NULL,
            target_id INT REFERENCES asset_data (id) NOT NULL,
            created   TIMESTAMP                         NOT NULL,
            updated   TIMESTAMP                         NOT NULL
        );
    END
$$;
