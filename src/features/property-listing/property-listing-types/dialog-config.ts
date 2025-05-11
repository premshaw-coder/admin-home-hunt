export interface DialogConfig<T = unknown> {
    data: T;
    header: string;
    width: string;
    height: string;
    showHeader: boolean;
    closeOnEscape: boolean;
    dismissableMask: boolean;
    closable: boolean;
}