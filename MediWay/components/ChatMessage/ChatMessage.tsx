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

const renderTextWithFormatting = (text: string, colors: any) => {
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  return paragraphs.map((paragraph, paraIndex) => {
    // Split each paragraph by single newlines to handle list items
    const lines = paragraph.split('\n');
    
    return (
      <View key={`para-${paraIndex}`} style={{ marginBottom: paraIndex < paragraphs.length - 1 ? 12 : 0 }}>
        {lines.map((line, lineIndex) => {
          // Parse bold text in each line
          const parts = line.split(/(\*\*.*?\*\*)/);
          
          return (
            <Text key={`line-${lineIndex}`} style={{ fontSize: 14, lineHeight: 22, color: colors.BLACK }}>
              {parts.map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <Text key={partIndex} style={{ fontWeight: 'bold' }}>
                      {part.slice(2, -2)}
                    </Text>
                  );
                }
                return part;
              })}
            </Text>
          );
        })}
      </View>
    );
  });
};

const ChatMessage = ({ isIncoming, text }: ChatMessageProp) => {
    const { colors } = useTheme();
    const cleanText = isIncoming ? removeCitations(text) : text;

    return (
        <View style={[
            isIncoming ? styles.incomingMessage : styles.outgoingMessage,
            isIncoming
                ? { backgroundColor: colors.WHITE }
                : { backgroundColor: colors.BACKGROUND, borderColor: colors.SECONDARY_DARK },
        ]}>
            {isIncoming ? (
                renderTextWithFormatting(cleanText, colors)
            ) : (
                <Text style={{ fontSize: 14, lineHeight: 22, color: colors.BLACK }}>
                    {cleanText}
                </Text>
            )}
        </View>
    );
};

export default ChatMessage;
