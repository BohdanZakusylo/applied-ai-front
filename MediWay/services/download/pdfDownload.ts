import { Alert, Share } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// Attempts to create a pdf from provided html data and prompts the share popup. Returns true if successful.
export const downloadPdf = async (html: string, filename: string): Promise<boolean> => {
    try {
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: filename,
        base64: false,
      });

      await Share.share({
        url: `file://${file.filePath}`,
        title: filename,
      });

      return true;
    } catch (err: any) {
      Alert.alert('Error', err.message);
      return false;
    }
}