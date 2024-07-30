import {
    Tabs,
    TabList,
    Tab,
    Box,
    TabPanels,
    Heading,
    Text,
} from "@chakra-ui/react";
import ChangeProfilePictureComponent from "./ChangeProfilePictureComponent";

export default function Settings() {
    return (
        <Box w="68vw" pt="14" mt="16" mx="auto">
            <Heading>Settings</Heading>
            <Tabs size={"sm"} mt="7">
                <TabList overflowY="hidden" height={"full"}>
                    <Tab py="2" whiteSpace={"nowrap"} m="0">
                        Account
                    </Tab>
                </TabList>

                <TabPanels py="8">
                    <ChangeProfilePictureComponent />
                    <Box mt="5">
                        <Text>Update Bio</Text>
                        <Text fontSize="sm" color="gray.500">
                            Write about yourself and your expertise to attract
                            audience
                        </Text>
                    </Box>
                    <Box mt="5">
                        <Text>Change Name</Text>
                        <Text fontSize="sm" color="gray.500">
                            Use your original name and avoid celebrities and
                            fictional characters names
                        </Text>
                    </Box>
                    <Box mt="5">
                        <Text>Change Password</Text>
                        <Text fontSize="sm" color="gray.500">
                            Choose a new password to login to your account
                        </Text>
                    </Box>
                    <Box mt="5">
                        <Text color="red.600">Delete Account</Text>
                        <Text fontSize="sm" color="gray.500">
                            Delete your account and all of your content
                        </Text>
                    </Box>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
