/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CardDetails from '../models/CardDetails';

export const mapAnyToCardDetails = (input: any): CardDetails => {
  return { ...input } as CardDetails;
};
