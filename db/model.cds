namespace ao.test;
using {
    cuid,
    managed
} from '@sap/cds/common';

aspect sourceSystem {
    /** Originating Source System */
    sourceSystem : String(100) default 'local' @title: '{i18n>sourceSystem}';
}

/** Aspect dimension */
aspect dimension {
    /** Code identifying the object */
    code        : String(100)            @title: '{i18n>Code}';
    /** Description of the object */
    description : localized String(1000) @title: '{i18n>Description}';
}

entity S_ReportingTypes : cuid, sourceSystem, dimension, managed {
    /** SAP Field ILART */
    sapILART : String(10) @title: '{i18n>SAPMaintenanceActivityTypeID}';
}

entity T_ReportingTypes : S_ReportingTypes {
   
}