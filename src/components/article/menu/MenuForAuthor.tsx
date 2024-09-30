import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import DeleteArticleConfirmationModal from "../../modals/DeleteArticleConfirmationModal";
import { useArticles } from "../../../context/articles";
import { IArticle } from "../../../types/articles";

export default function MenuForAuthor({ article }: {
    article: IArticle
}) {
    const { filterArticle } = useArticles();

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
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>
                            <DeleteArticleConfirmationModal
                                articleID={article._id}
                                filterArticle={filterArticle}
                            />
                        </MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    )
}
