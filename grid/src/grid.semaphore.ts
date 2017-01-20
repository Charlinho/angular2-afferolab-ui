import { AbstractStatus } from './grid.status';

export class GridSemaphore extends AbstractStatus {

  constructor(statuses: Array<any>) {
    super(statuses);
  }
}