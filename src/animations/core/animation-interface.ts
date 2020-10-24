export interface IAnimation {
    start(animationTime: number, onFinish?: () => void): void;
    stop(): void;
    isFinished(): boolean;
}
