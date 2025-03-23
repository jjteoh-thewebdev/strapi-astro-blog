import { useEffect } from "react";

export default function CopyLinkScript() {
  useEffect(() => {
    const copyLinkButton = document.getElementById("copyLinkButton");
    const url = copyLinkButton?.getAttribute("data-url");

    copyLinkButton?.addEventListener("click", () => {
      if (url) {
        navigator.clipboard.writeText(url);
      }
    });
  }, []);

  return null; // No UI, only a script
}
