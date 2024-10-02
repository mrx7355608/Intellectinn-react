import { TabList, Tab } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type TabData = {
    title: string;
    link: string;
};

interface IMyTabListProps {
    tabs: TabData[];
}

export default function MyTabsList({ tabs }: IMyTabListProps) {
    return (
        <TabList overflowY="hidden" height={"full"}>
            {tabs.map((tab) => {
                return (
                    <Link key={tab.title} to={tab.link}>
                        <Tab py="2" whiteSpace={"nowrap"} m="0">
                            {tab.title}
                        </Tab>
                    </Link>
                );
            })}
        </TabList>
    );
}
