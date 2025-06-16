import { Alert } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

// Attempts to create a pdf from provided html data and prompts to open the file. Returns true if successful.
export const downloadPdf = async (html: string, filename: string): Promise<boolean> => {
    try {
        const file = await RNHTMLtoPDF.convert({
            html,
            fileName: filename,
            base64: false,
        });

        if (!file.filePath) {
            return false;
        }

        await FileViewer.open(file.filePath, { showOpenWithDialog: true });

        return true;
    } catch (err: any) {
        Alert.alert('Error', err.message);
        return false;
    }
}