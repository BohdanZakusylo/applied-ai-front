import { View, Text } from 'react-native';
import styles from './styles';
import { useTheme } from '../../contexts/ThemeContext';

export interface ChatResponse {
    response: string;
    message_id: string;
    timestamp: string;
}

export interface ChatMessageProp {
    id: string;
    isIncoming: boolean;
    text: string;
}


const removeCitations = (text: string): string => {
    return text
      .replace(/\【\d+:\d+†source\】/g, '') // Unicode brackets
      .replace(/\[\d+:\d+†source\]/g, '')  // Regular brackets  
      .replace(/\【\d+†source\】/g, '')     // Unicode brackets short form
      .replace(/\[\d+†source\]/g, '')      // Regular brackets short form
      .replace(/[ \t]+/g, ' ')             // Clean up extra horizontal spaces
      .trim();
};

const formatTextToParagraphsAndList = (text: string): string[] => {
  return removeCitations(text)
    .replace(/(\d+)\.(?=\S)/g, '$1. ')
    .replace(/(?<!^)(?<!\n)(\d+\.\s)/g, '\n\n$1')
    .replace(/(\d+\..*?\n)(?=[A-Z])/g, '$1\n')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')
    .split(/\n{2,}/)
    .map(line => line.trim())
    .filter(Boolean);
};

const renderParagraphWithBold = (paragraph: string, colors: any) => {
  const parts = paragraph.split(/(\*\*.*?\*\*)/);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={idx} style={{ fontWeight: 'bold', color: colors.BLACK }}>
          {part.slice(2, -2)}
        </Text>
      );
    }

    return (
      <Text key={idx} style={{ color: colors.BLACK }}>
        {part}
      </Text>
    );
  });
};

const ChatMessage = ({ isIncoming, text }: ChatMessageProp) => {
    const { colors } = useTheme();
    const formattedBlocks = isIncoming ? formatTextToParagraphsAndList(text) : [text];

    return (
        <View style={[
            isIncoming ? styles.incomingMessage : styles.outgoingMessage,
            isIncoming
                ? { backgroundColor: colors.WHITE }
                : { backgroundColor: colors.BACKGROUND, borderColor: colors.SECONDARY_DARK },
        ]}>
        {formattedBlocks.map((block, index) => (
            <Text
                key={index}
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  marginBottom: 10,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  color: colors.BLACK,
                }}>
                {isIncoming ? renderParagraphWithBold(block, colors) : block}
            </Text>
        ))}
        </View>
    );
};

export default ChatMessage;
