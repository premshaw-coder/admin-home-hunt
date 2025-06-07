export interface ConfirmPopUpConfig {
    header: string;
    message: string;
    OnAccept: () => void;
    OnReject: () => void;
  }