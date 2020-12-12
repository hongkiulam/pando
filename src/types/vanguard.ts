export type Resource =
  | "performance"
  | "personalDetails"
  | "isaDetails"
  | "holdings"
  | "valuationHistory"
  | "monthlyPerformance";

export interface VGState {
  loading: boolean;
  error: string;
  data: {
    [key in Resource]?: APIResponse;
  };
}

type APIResponse = {
  [key: string]: any;
};
