import { VStack, Radio, RadioGroup } from "@chakra-ui/react";
import { IArticle } from "../../types/articles";
import { SetStateAction } from "react";

export default function ArticlePublishStatus({
    setArticleData,
}: {
    setArticleData: React.Dispatch<SetStateAction<IArticle>>;
}) {
    return (
        <RadioGroup defaultValue="2">
            <VStack alignItems={"start"}>
                <Radio colorScheme="red" value="1" onClick={selectDraft}>
                    Draft
                </Radio>
                <Radio colorScheme="green" value="2" onClick={selectPublished}>
                    Published
                </Radio>
            </VStack>
        </RadioGroup>
    );

    function selectDraft() {
        setArticleData((prev) => ({ ...prev, is_published: false }));
    }

    function selectPublished() {
        setArticleData((prev) => ({ ...prev, is_published: true }));
    }
}
