import { Alert, PermissionsAndroid, Platform, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import styles from './styles';
import { ChatMessageProp } from '../ChatMessage/ChatMessage';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';
import { downloadPdf } from '../../services/download/pdfDownload';
import { PropsWithChildren } from 'react';
import RNFS from 'react-native-fs';

export type DownloadSummaryButtonProps = {
    chatHistory: ChatMessageProp[];
} & ViewProps & PropsWithChildren

const DownloadSummaryButton = (props: DownloadSummaryButtonProps) => {
    const requestPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 33) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    const getLogoPath = async (): Promise<string> => {
        let filePath = '';

        if (Platform.OS === 'android') {
            filePath = 'logo.png';
            await RNFS.copyFileAssets(filePath, `${RNFS.DocumentDirectoryPath}/logo.png`);
            filePath = `${RNFS.DocumentDirectoryPath}/logo.png`;
        } else {
            filePath = `${RNFS.MainBundlePath}/logo.png`;
        }

        return filePath;
    }

    const onDownload = async () => {
        try {
            const hasPermission = await requestPermission();
            if (!hasPermission) {
                Alert.alert('Permission denied', 'Storage permission is required to save PDF');
                return;
            }

            const date = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replaceAll(',', '').replaceAll('/', '-').replaceAll(':', '.');
            
            const filename = `MediWay Chat Summary (${date})`;
            
            const logoB64 = `data:image/png;base64,${await RNFS.readFile(await getLogoPath(), 'base64')}`;

            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                                background-color: ${COLORS.BACKGROUND.toString()};
                                display: flex;
                                flex-direction: column;
                            }
                            img {
                                width: 400px;
                                height: auto;
                                align-self: center;
                            }
                            h2 {
                                text-align: center;
                                color: ${COLORS.BLACK.toString()};
                            }
                            .chat {
                                width: 100%;
                                height: auto;
                                display: flex;
                                flex-direction: column;
                            }
                            .message {
                                background-color: ${COLORS.WHITE.toString()};
                                padding: 10px;
                                border-radius: 8px;
                                margin-bottom: 8px;
                                margin-right: 50%;
                            }
                            #userMessage {
                                background-color: ${COLORS.BACKGROUND.toString()};
                                border: 2px solid ${COLORS.SECONDARY_DARK.toString()};
                                margin-left: 50%;
                                margin-right: 0;
                                display: flex;
                            }
                            .text {
                                margin-left: 10px;
                                display: inline-block;
                                color: ${COLORS.BLACK.toString()};
                            }
                            .footer {
                                position: absolute;
                                bottom: 0;
                                width: 100%;
                                height: 60px;
                                text-align: center;
                                color: ${COLORS.BLACK.toString()};
                                padding-top: 10px;
                                border-top: 1px solid ${COLORS.GRAY.toString()};
                            }
                        </style>
                    </head>
                
                    <body>
                        <img src="${logoB64}"/>
                        <h2>Chat Summary</h2>
                        <div class="chat">
                            ${props.chatHistory.map((message: ChatMessageProp) => `
                                <div class="message"${!message.isIncoming ? ' id="userMessage"' : ''}>
                                    <span class="text">${message.text}</span><br/>
                                </div>
                            `).join('')}
                        </div>
                        <p class="footer">MediWay chat of: ${date}</p>
                    </body>
                </html>`;

            await downloadPdf(htmlContent, filename);
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        };
    }

    return (
        <TouchableOpacity style={styles.button} hitSlop={BASE_HIT_SLOP} onPress={onDownload}>
            <View {...props}>
                {props.children}
            </View>
        </TouchableOpacity>
    );
};

export default DownloadSummaryButton;
