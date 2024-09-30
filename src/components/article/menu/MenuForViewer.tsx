import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

export default function MenuForViewer() {
    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        isActive={isOpen}
                        as={Button}
                        bg="transparent"
                        _hover={{ bg: "transprent" }}
                    >
                        <BsThreeDots size={22} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Follow author</MenuItem>
                        <MenuItem>Unfollow author</MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    )
}
