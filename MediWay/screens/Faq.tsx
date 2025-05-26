import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Section {
  title: string;
  items: FAQItem[];
}

const faqData: Section[] = [
  {
    title: 'Basic Insurance questions',
    items: [
      {
        question: 'What kind of health insurance do I need as an international student?',
        answer: 'You will usually need basic Dutch health insurance or a private international plan depending on your circumstances.',
      },
      {
        question: 'Is my home country insurance valid in the Netherlands?',
        answer: 'Usually no, unless it’s part of an EU agreement (e.g., EHIC).',
      },
      {
        question: 'What is the difference between public and private insurance?',
        answer: 'Public insurance is required by law for residents. Private insurance is optional and offers extended coverage.',
      },
      {
        question: 'Do I need Dutch basic health insurance (basisverzekering)?',
        answer: 'Yes, if you are working or staying long term in the Netherlands.',
      },
      {
        question: 'What happens if I don’t have insurance while living in the Netherlands?',
        answer: 'You may get fined and will have to cover medical expenses yourself. It’s best to arrange your insurance as soon as possible.',
      },
    ],
  },
  {
    title: 'Registration & Requirements',
    items: [
      {
        question: 'How do I apply for Dutch health insurance?',
        answer: 'You can apply online through Dutch insurance company websites after registering at the municipality.',
      },
      {
        question: 'What documents do I need to register for health insurance?',
        answer: 'You usually need a BSN number, proof of address, and a valid residence permit.',
      },
      {
        question: 'Can I keep using my EHIC (European Health Insurance Card)?',
        answer: 'You can if you’re temporarily staying and covered by your home country’s system.',
      },
      {
        question: 'I’m doing a paid internship — does that change my insurance status?',
        answer: 'Yes. Paid internships often mean you’re considered employed and must get Dutch health insurance.',
      },
    ],
  },
];

const Faq = () => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>FAQ</Text>

        {faqData.map((section, sectionIndex) => (
          <View key={sectionIndex}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => {
              const key = `${sectionIndex}-${itemIndex}`;
              const isOpen = expandedItems[key];

              return (
                <View key={key} style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => toggleItem(key)} style={styles.questionRow}>
                    <Text style={styles.questionText}>{item.question}</Text>
                    <Text style={[styles.arrow, { color: isOpen ? '#0077B6' : '#AFB1B6' }]}>
                      {isOpen ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                  )}
                  <View style={[styles.divider, { borderBottomColor: isOpen ? 'transparent' : '#AFB1B6' }]} />
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scroll: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'BalooBhai2-Bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'BalooBhai2-SemiBold',
    marginTop: 16,
    marginBottom: 8,
    color: '#1F2937',
  },
  itemContainer: {
    marginBottom: 8,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  questionText: {
    fontSize: 15,
    fontFamily: 'BalooBhai2-Regular',
    color: '#1F2937',
    flex: 1,
    paddingRight: 12,
  },
  arrow: {
    fontSize: 16,
  },
  answerContainer: {
    backgroundColor: '#E0EAF0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  answerText: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'BalooBhai2-Regular',
  },
  divider: {
    borderBottomWidth: 1,
  },
});

export default Faq;