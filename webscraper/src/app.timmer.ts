export class Timer {
    private readonly startAt: Date;

    constructor() {
        this.startAt = new Date();
    }

    end = (processName?: string): string => `${processName ? processName + ' ' : ''}took ${new Date().getTime() - this.startAt.getTime()}ms`;

}