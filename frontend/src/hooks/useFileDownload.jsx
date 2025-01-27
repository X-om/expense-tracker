import { useCallback } from "react";

export const useFileDownload = () => {
    const downloadFile = useCallback((blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }, []);

    return downloadFile;
};
