import { NodeData, DecisionTree } from '../types';
import { STAGES as APP_STAGES } from './stages';
import { STAGE_CI_NODES } from './nodes/stageCI';
import { STAGE_CII_CIIIB_NODES } from './nodes/stageCIItoCIIIB';
import { STAGE_CIIIABC_NODES } from './nodes/stageCIIIABC';
import { APEX_TUMORS_NODES } from './nodes/apexTumors';
import { STAGE_IV_NON_EPIDERMOID_NODES } from './nodes/stageIVNonEpidermoid';
import { STAGE_IV_EPIDERMOID_NODES } from './nodes/stageIVEpidermoid';
import { STAGE_IV_SECOND_LINE_NODES } from './nodes/stageIVSecondLine';
import { STAGE_IV_EGFR_NODES } from './nodes/stageIVEGFR';
import { STAGE_IV_ALK_NODES } from './nodes/stageIVALK';


export const ALL_NODES: DecisionTree = {
  ...STAGE_CI_NODES,
  ...STAGE_CII_CIIIB_NODES,
  ...STAGE_CIIIABC_NODES,
  ...APEX_TUMORS_NODES,
  ...STAGE_IV_NON_EPIDERMOID_NODES,
  ...STAGE_IV_EPIDERMOID_NODES,
  ...STAGE_IV_SECOND_LINE_NODES,
  ...STAGE_IV_EGFR_NODES,
  ...STAGE_IV_ALK_NODES,
};

export const STAGES = APP_STAGES;