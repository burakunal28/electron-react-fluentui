import {
  bundleIcon,
  ChatHelp20Filled,
  ChatHelp20Regular,
  ClipboardError20Filled,
  ClipboardError20Regular,
  DeveloperBoardLightning20Filled,
  Home20Filled,
  Home20Regular,
  LayerDiagonal20Filled,
  LayerDiagonal20Regular,
  Settings20Filled,
  Settings20Regular,
  WrenchScrewdriver20Filled,
  WrenchScrewdriver20Regular,
} from "@fluentui/react-icons";
import Help from "@pages/help/Help";
import Home from "@pages/home/Home";
import type { Route } from "@/types/routes";

export const ModulesIcon = bundleIcon(
  LayerDiagonal20Filled,
  LayerDiagonal20Regular,
);

export const ConfigIcon = bundleIcon(
  WrenchScrewdriver20Filled,
  WrenchScrewdriver20Regular,
);

export const HelpIcon = bundleIcon(ChatHelp20Filled, ChatHelp20Regular);

export const HomeIcon = bundleIcon(Home20Filled, Home20Regular);

export const MessagesIcon = bundleIcon(
  ClipboardError20Filled,
  ClipboardError20Regular,
);

export const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular);
export const ConfigIconFilled = WrenchScrewdriver20Filled;
export const HelpIconFilled = ChatHelp20Filled;
export const HomeIconFilled = Home20Filled;
export const MessagesIconFilled = ClipboardError20Filled;
export const ModulesIconFilled = DeveloperBoardLightning20Filled;
export const SettingsIconFilled = Settings20Filled;

export const routes: Route[] = [
  {
    path: "/home",
    title: "Home",
    icon: <HomeIcon />,
    filledIcon: <HomeIconFilled />,
    component: Home,
  },
  {
    path: "/help",
    title: "Help",
    icon: <HelpIcon />,
    filledIcon: <HelpIconFilled />,
    component: Help,
  },
];
