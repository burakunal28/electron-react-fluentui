import { useTab } from "@context/tabs/TabContext";
import type {
  SelectTabData,
  SelectTabEventHandler,
} from "@fluentui/react-components";
import { Tab, TabList } from "@fluentui/react-components";
import { useRouteTabs } from "@hooks/useRouteTabs";
import type { TabComponentProps } from "@/types/layout/tabComponent";

/**
 * Tab component used on pages
 * Automatically creates tabs defined in the routes structure
 */
export const TabComponent = ({
  appearance = "filled-circular",
  className = "standart-tabs",
  disabledTabKeys = [],
}: TabComponentProps) => {
  const { hasTabs, tabKeys, tabLabels } = useRouteTabs();
  const { selectedTab, setSelectedTab } = useTab();

  // If there are no tabs, don't render anything
  if (!hasTabs) return null;

  // Tab selection event
  const handleTabSelect: SelectTabEventHandler = (_, data: SelectTabData) => {
    const tabKey = data.value as string;
    setSelectedTab(tabLabels[tabKey]);
  };

  const selectedValue =
    tabKeys.find((key) => tabLabels[key] === selectedTab) ?? tabKeys[0];

  return (
    <TabList
      selectedValue={selectedValue}
      onTabSelect={handleTabSelect}
      appearance={appearance}
      className={className}
    >
      {tabKeys.map((key) => (
        <Tab key={key} value={key} disabled={disabledTabKeys.includes(key)}>
          {tabLabels[key]}
        </Tab>
      ))}
    </TabList>
  );
};
