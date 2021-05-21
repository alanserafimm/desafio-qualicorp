

export interface ISpinnerButton {
    widgetId: string;
    text: string;
    icon: string;
    color: IColor;
    type: IType;
    start(): void;
    stop(): void;
    execute(): void;
};

export enum IColor {
    Primary = "primary",
    Accent = "accent",
    Warn = "warn"
};

export enum IType {
    Submit = "submit",
    Button = "button",
};