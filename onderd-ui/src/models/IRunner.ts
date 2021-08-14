export enum RunnerStatus {
  DidNotStart,
  DidNotFinish,
  NotStarted,
  Started,
  Finished,
  Disqualified,
};

export interface TimeInfo {
  startTime: Date;
  endTime: Date;
}

export interface IRunner {
  givenName: string;
  familiyName: string;
  ecardId: number;
  status: RunnerStatus;
  time: number;
  timeInfo: TimeInfo;
};
