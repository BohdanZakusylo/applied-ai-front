import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    UIManager,
    Platform,
    ScrollView,
    Image,
    ImageSourcePropType,
} from 'react-native';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LOGO: ImageSourcePropType = require('../../assets/images/logo.png');

const chevronUp: ImageSourcePropType = require('../../assets/images/faq/chevron-up.png');
const chevronDown: ImageSourcePropType = require('../../assets/images/faq/chevron-down.png');

const FAQ_DATA = [
    {
        section: 'Basic Insurance questions',
        items: [
            { question: 'What kind of health insurance do I need as an international?', answer: 'You need Dutch basic health insurance (basisverzekering) if you live or work in the Netherlands.' },
            { question: 'Is my home country insurance valid in the Netherlands?', answer: 'Only in some cases. Generally, you need Dutch insurance if you stay long-term.' },
            { question: 'What is the difference between public and private insurance?', answer: 'Public insurance is mandatory and covers essential care. Private insurance offers additional optional benefits.' },
            { question: 'Do I need Dutch basic health insurance (basisverzekering)?', answer: 'Yes, if you live, work, or study in the Netherlands and are not covered by an exemption.' },
            {
                question: 'What happens if I don’t have insurance while living in the Netherlands?',
                answer:
                    'If you’re required to have Dutch health insurance but don’t get it, you may receive a fine from the government. You’ll also have to pay for any medical costs yourself, which can be very expensive. It\'s best to arrange your insurance as soon as possible.',
            },
        ],
    },
    {
        section: 'Registration & Requirements',
        items: [
            { question: 'How do I apply for Dutch health insurance?', answer: 'You can apply directly via the websites of Dutch health insurance providers.' },
            { question: 'What documents do I need to register for health insurance?', answer: 'Usually your BSN (citizen service number), ID/passport, and proof of residence/employment.' },
            { question: 'Can I keep using my EHIC (European Health Insurance Card)?', answer: 'Yes, but only for temporary stays. If you’re living here, you need Dutch insurance.' },
            { question: 'I\'m doing a paid internship — does that change anything?', answer: 'Yes, paid internships usually require you to have Dutch basic health insurance.' },
        ],
    },
];

const FaqScreen = () => {
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleItem = (key: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(prev => (prev === key ? null : key));
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Frequently Asked Questions</Text>

            {FAQ_DATA.map((section, sectionIndex) => (
                <View key={sectionIndex}>
                    <Text style={styles.sectionTitle}>{section.section}</Text>
                    {section.items.map((item, index) => {
                        const key = `${sectionIndex}-${index}`;
                        const isOpen = expanded === key;

                        return (
                            <View key={key} style={styles.faqItem}>
                                <TouchableOpacity
                                    onPress={() => toggleItem(key)}
                                    style={styles.questionContainer}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={styles.questionText}
                                        numberOfLines={isOpen ? undefined : 1}
                                    >
                                        {item.question}
                                    </Text>
                                    {
                                        isOpen ?
                                            <Image source={chevronUp} style={{ width: 20, height: 20 }} /> :
                                            <Image source={chevronDown} style={{ width: 20, height: 20 }} />
                                    }
                                </TouchableOpacity>

                                {isOpen && (
                                    <View style={styles.answerContainer}>
                                        <Text style={styles.answerText} numberOfLines={undefined}>
                                            {item.answer}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            ))}
        </ScrollView>
    );
};

export default FaqScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: '100%',
        height: 96,
        marginTop: 32,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        flex: 1,
        marginRight: 8,
    },
    answerContainer: {
        backgroundColor: '#f1fafd',
        marginTop: 8,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: '#88c4f3',
        borderRadius: 4,
        overflow: 'visible',
    },
    answerText: {
        fontSize: 18,
        color: '#333',
    },
});
