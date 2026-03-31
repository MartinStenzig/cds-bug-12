using {ao.test as a} from '../db/model';

service AdminService {
    entity Source as projection on a.S_ReportingTypes;
    entity Target as projection on a.T_ReportingTypes;

}
