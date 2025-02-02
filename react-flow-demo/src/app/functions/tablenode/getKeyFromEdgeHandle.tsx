import {DASH_SOURCE, DASH_TARGET} from "@/app/constants/appStringConstants";
import lodash from "lodash";

const extractKeyFromEdgeHandle = (edgeHandle: string): string => {
  edgeHandle = lodash.trimEnd(edgeHandle, DASH_SOURCE);
  return lodash.trimEnd(edgeHandle, DASH_TARGET);
}

export default extractKeyFromEdgeHandle;
