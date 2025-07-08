export interface ErrorCode {
  spn: number;
  fmi: number;
  error: string;
  info: string;
  reaction: string;
}

export interface J1939Data {
  spn: number;
  fmi: number;
  cvt: number;
}

export interface DTC {
  spn: number;
  fmi: number;
  occurence: number;
}

export interface DTCResponse {
  success: boolean;
  serviceId: number;
  dtcs: DTC[];
}
