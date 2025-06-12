import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ChatMessageProp } from '../ChatMessage/ChatMessage';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { downloadPdf } from '../../services/download/pdfDownload';

const ChatMessage = (chatHistory: ChatMessageProp[]) => {
    const onDownload = async () => {
        const filename = new Date().toDateString();
        const htmlContent = `
            <html>
                <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .message { margin-bottom: 12px; }
                    .user { color: blue; font-weight: bold; }
                    .bot { color: green; font-weight: bold; }
                    .text { margin-left: 10px; display: inline-block; }
                </style>
                </head>
                <body>
                <h2>Chat Summary</h2>
                ${chatHistory.map((message: ChatMessageProp) => `
                    <div class="message">
                    <span class="${message.isIncoming ? 'bot' : 'user'}">
                        ${message.isIncoming ? 'MediWay' : 'You'}:
                    </span>
                    <span class="text">${message.text}</span><br/>
                    </div>
                `).join('')}
                </body>
            </html>`;
        
        await downloadPdf(htmlContent, filename);
    }

    return (
        <TouchableOpacity style={styles.button} hitSlop={BASE_HIT_SLOP} onPress={onDownload}>
            <Text style={styles.text}>Download PDF</Text>
        </TouchableOpacity>
    );
};

export default ChatMessage;
