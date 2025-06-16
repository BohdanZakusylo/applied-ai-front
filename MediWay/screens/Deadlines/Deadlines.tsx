import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import styles from './styles';
import { COLORS } from '../../assets/constants';

// Mock data for deadlines
interface Deadline {
  id: string;
  category: string;
  message: string;
  email: string;
}

// Available categories with their respective colors
const CATEGORIES = [
  { value: 'Medical', color: COLORS.PRIMARY },
  { value: 'Insurance', color: COLORS.SECONDARY_DARK },
  { value: 'Appointment', color: COLORS.WARNING },
  { value: 'Medication', color: COLORS.ACCENT },
  { value: 'General', color: COLORS.GRAY },
];

// Mock initial data
const initialDeadlines: Deadline[] = [
  { 
    id: '1', 
    category: 'Medical', 
    message: 'Annual medical checkup at City Hospital', 
    email: 'john.doe@example.com' 
  },
  { 
    id: '2', 
    category: 'Insurance', 
    message: 'Insurance renewal deadline', 
    email: 'john.doe@example.com' 
  },
  { 
    id: '3', 
    category: 'Medication', 
    message: 'Refill prescription medication', 
    email: 'john.doe@example.com' 
  },
];

const DeadlinesScreen = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDeadline, setCurrentDeadline] = useState<Deadline>({
    id: '',
    category: 'General',
    message: '',
    email: 'john.doe@example.com'  // Default email
  });
  
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  // Open modal to add a new deadline
  const handleAddDeadline = () => {
    setIsEditing(false);
    setCurrentDeadline({
      id: '',
      category: 'General',
      message: '',
      email: 'john.doe@example.com'
    });
    setModalVisible(true);
  };

  // Open modal to edit an existing deadline
  const handleEditDeadline = (deadline: Deadline) => {
    setIsEditing(true);
    setCurrentDeadline({ ...deadline });
    setModalVisible(true);
  };

  // Delete a deadline
  const handleDeleteDeadline = (id: string) => {
    Alert.alert(
      "Delete Deadline",
      "Are you sure you want to delete this deadline?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => setDeadlines(deadlines.filter(item => item.id !== id)),
          style: "destructive"
        }
      ]
    );
  };

  // Save new or edited deadline
  const handleSaveDeadline = () => {
    if (!currentDeadline.message) {
      Alert.alert("Error", "Please enter a message for the deadline.");
      return;
    }

    if (isEditing) {
      // Update existing deadline
      setDeadlines(deadlines.map(item => 
        item.id === currentDeadline.id ? currentDeadline : item
      ));
    } else {
      // Add new deadline with a unique ID
      const newId = Date.now().toString();
      setDeadlines([...deadlines, {...currentDeadline, id: newId}]);
    }
    
    setModalVisible(false);
  };

  // Get color for category badge
  const getCategoryColor = (category: string) => {
    const foundCategory = CATEGORIES.find(cat => cat.value === category);
    return foundCategory ? foundCategory.color : COLORS.GRAY;
  };

  // Render individual deadline item
  const renderDeadlineItem = ({ item }: { item: Deadline }) => {
    const categoryColor = getCategoryColor(item.category);
    
    return (
      <View style={styles.deadlineItem}>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.deadlineMessage}>{item.message}</Text>
        <Text style={styles.deadlineEmail}>{item.email}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleEditDeadline(item)}
          >
            <Text style={{ color: COLORS.PRIMARY }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteDeadline(item.id)}
          >
            <Text style={{ color: COLORS.ERROR }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Empty state when no deadlines exist
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={{ width: 80, height: 80, opacity: 0.5 }}
        resizeMode="contain"
      />
      <Text style={styles.emptyStateText}>
        You don't have any deadlines yet.{'\n'}
        Tap the + button to add one.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Deadlines</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddDeadline}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.deadlinesList}
        data={deadlines}
        renderItem={renderDeadlineItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Modal for adding/editing deadlines */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Deadline' : 'Add New Deadline'}
            </Text>
            
            <Text style={styles.inputLabel}>Category</Text>
            <TouchableOpacity 
              style={[styles.input, { paddingVertical: 12 }]}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={{ color: COLORS.BLACK }}>{currentDeadline.category}</Text>
            </TouchableOpacity>
            
            {/* Category Selection Modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={categoryModalVisible}
              onRequestClose={() => setCategoryModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { maxHeight: 300 }]}>
                  <Text style={styles.modalTitle}>Select Category</Text>
                  <ScrollView>
                    {CATEGORIES.map((category) => (
                      <TouchableOpacity 
                        key={category.value}
                        style={{
                          paddingVertical: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: COLORS.LIGHT_GRAY
                        }}
                        onPress={() => {
                          setCurrentDeadline({...currentDeadline, category: category.value});
                          setCategoryModalVisible(false);
                        }}
                      >
                        <Text style={{ color: COLORS.BLACK }}>{category.value}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton, { marginTop: 10 }]}
                    onPress={() => setCategoryModalVisible(false)}
                  >
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={styles.input}
              value={currentDeadline.message}
              onChangeText={(text) => 
                setCurrentDeadline({...currentDeadline, message: text})
              }
              placeholder="Enter deadline message"
              placeholderTextColor={COLORS.LIGHT_GRAY}
              multiline
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveDeadline}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeadlinesScreen;
