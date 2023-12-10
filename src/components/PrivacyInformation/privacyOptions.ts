import { VolumeX, Ban } from "lucide-react";

export const privacyOptions = [
    {
        id: "/Muted",
        title: "Muted accounts",
        description: "Manage the accounts that you've muted.",
        icon: VolumeX,
    },
    {
        id: "/Blocked",
        title: "Blocked accounts",
        description: "Manage the accounts that you've blocked.",
        icon: Ban,
    },
];