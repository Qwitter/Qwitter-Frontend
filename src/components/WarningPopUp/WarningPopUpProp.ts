export type WarningPopUpProp = {
    UserAction: string;
    username: string;
    desc: string;
    ButtonFunc: () => void;
    headerFunction: () => void;
    ButtonVariant:
    | "link"
    | "default"
    | "destructive"
    | "danger"
    | "outline"
    | "secondary"
    | "ghost";
    PopUpshow: boolean;
};