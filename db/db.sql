# DATA BASE. MULTIPLE INVENTORY, PURCHASE AND SALE SYSTEM [MIPSS] / BASE DE DATOS. SISTEMA DE INVENTARIO, COMPRA Y VENTA MULTIPLE [MIPSS]

CREATE DATABASE IF NOT EXISTS `MIPSS_`;

USE `MIPSS_`;
# TABLAS (TABLES)


# --------- <ENGLISH: MODULE. USERS / SPANISH: MÓDULO. USUARIOS> ----------- #

# <ENGLISH: USERS / SPANISH: USUARIOS>
CREATE TABLE IF NOT EXISTS `MIPSS_`.`0_Usrs` (
    `Rfrnc`        INT    (255) NOT NULL AUTO_INCREMENT COMMENT 'Rfrnc        (English: Reference                          / Spanish: Referencia)',
    `Usrnm`        VARCHAR(20)  NOT NULL                COMMENT 'Usrnm        (English: Username                           / Spanish: Nombre de Usuario)',
    `Psswrd`       VARCHAR(255) NOT NULL                COMMENT 'Psswrd       (English: Password                           / Spanish: Contraseña)',
    `Rfrnc_Prsn`   INT    (255) NOT NULL                COMMENT 'Rfrnc_Prsn   (English: Reference. Person                  / Spanish: Referencia. Persona)',
    `UsrTyp_Rfrnc` INT    (255) NOT NULL                COMMENT 'UsrTyp_Rfrnc (English: User Type. Reference               / Spanish: Referencia. Tipo de Usuario)',
    `Cndtn`        INT    (2)   NOT NULL                COMMENT 'Cndtn        (English: Condition [0: Inactive, 1: Active] / Spanish: Estado [0: Inactivo, 1: Activo])',
    `Rmvd`         INT    (2)   NOT NULL                COMMENT 'Rmvd         (English: Removed [0: Inactive, 1: Active]   / Spanish: Eliminado [0: Inactivo, 1: Activo])',
    `Lckd`         INT    (2)   NOT NULL                COMMENT 'Lckd         (English: Locked [0: Inactive, 1: Active]    / Spanish: Bloqueado [0: Inactivo, 1: Activo])',
    `DtAdmssn`     DATE             NULL                COMMENT 'DtAdmssn     (English: Date of Admission                  / Spanish: Fecha de Ingreso)',
    `ChckTm`       TIME             NULL                COMMENT 'ChckTm       (English: Check In Time                      / Spanish: Hora de Ingreso)',
    PRIMARY KEY (`Rfrnc`)
) ENGINE='MyISAM' DEFAULT CHARSET='utf8' COLLATE='utf8_bin' COMMENT='0_Usrs (English: 0 - Users / Spanish: 0 - Usuarios)';
DESCRIBE `MIPSS_`.`0_Usrs`
# <0 - USUARIOS: INSERTAR DATOS>

# <0 - USUARIOS: INSERTAR DATOS>
# <.ENGLISH: USERS / SPANISH: USUARIOS>

# <PROCEDURE: ADD OR EDIT>
CREATE PROCEDURE `0_usrsAddOrEdit`(
    IN `_Rfrnc`        INT    (255),
    IN `_Usrnm`        VARCHAR(255),
    IN `_Psswrd`       VARCHAR(255),
    IN `_Rfrnc_Prsn`   INT    (255),
    IN `_UsrTyp_Rfrnc` INT    (255),
    IN `_Cndtn`        INT    (2)  ,
    IN `_Rmvd`         INT    (2)  ,
    IN `_Lckd`         INT    (2)  ,
    IN `_DtAdmssn`     DATE        ,
    IN `_ChckTm`       TIME        
)
BEGIN
    IF `_Rfrnc` = 0 THEN 
        INSERT INTO `0_Usrs` (`Usrnm`, `Psswrd`, `Rfrnc_Prsn`, `UsrTyp_Rfrnc`, `Cndtn`, `Rmvd`, `Lckd`, `DtAdmssn`, `ChckTm`) 
        VALUES (`_Usrnm`, `_Psswrd`, `_Rfrnc_Prsn`, `_UsrTyp_Rfrnc`, `_Cndtn`, `_Rmvd`, `_Lckd`, `_DtAdmssn`, `_ChckTm`);
        SET `_Rfrnc` = LAST_INSERT_ID();
    ELSE
        UPDATE `0_Usrs`
            SET `Usrnm` = `_Usrnm`, `Psswrd` = `_Psswrd`, `Rfrnc_Prsn` = `_Rfrnc_Prsn`, `UsrTyp_Rfrnc` = `_UsrTyp_Rfrnc`, `Cndtn` = `_Cndtn`, `Rmvd` = `_Rmvd`, `Lckd` = `_Lckd` WHERE `Rfrnc` = `_Rfrnc`;
    END IF;

    SELECT `_Rfrnc` AS `Rfrnc`;
END
# <.PROCEDURE: ADD OR EDIT>