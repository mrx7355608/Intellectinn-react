import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyEditor } from "tinymce";
import React from "react";

const TinymceEditor = React.forwardRef<TinyEditor>((_props, ref) => {
    return (
        <>
            <Editor
                apiKey={import.meta.env.VITE_TINYKEY}
                onInit={(_evt, editor) => (ref.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    width: "100%",
                    height: 1000,
                    menubar: true,
                    plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                        "undo redo | blocks fontsize fontfamily formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14pt }",
                }}
            />
        </>
    );
});

export default TinymceEditor;
