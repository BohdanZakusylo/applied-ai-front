import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DeadlinesService, { Deadline, DeadlineCreate, DeadlineUpdate } from '../../services/deadlinesService';
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

// Define the route param types
type RootStackParamList = {
  Deadlines: {
    newDeadline?: {
      title: string;
      due_date: string;
    };
  } | undefined;
};

// Get the types for route and navigation
type DeadlinesScreenRouteProp = RouteProp<RootStackParamList, 'Deadlines'>;
type DeadlinesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Deadlines'>;

// Using the Deadline interface from deadlinesService.ts

// Format to display deadlines
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const DeadlinesScreen = () => {
  // Use properly typed route and navigation
  const route = useRoute<DeadlinesScreenRouteProp>();
  const navigation = useNavigation<DeadlinesScreenNavigationProp>();
  
  // Check if a new deadline was passed through navigation params
  const newDeadlineParam = route.params?.newDeadline;
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDeadlineId, setSelectedDeadlineId] = useState<number | null>(null);
  const [currentDeadline, setCurrentDeadline] = useState<Omit<Deadline, 'id' | 'user_id' | 'created_at' | 'updated_at'>>({    
    title: '',
    due_date: new Date().toISOString().split('T')[0] + 'T15:00:00' // Default to today at 3:00 PM
  });
  
  // No longer need category modal

  // Fetch deadlines from API
  const fetchDeadlines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DeadlinesService.getAllDeadlines();
      setDeadlines(response.items);
    } catch (err) {
      console.error('Error fetching deadlines:', err);
      setError('Failed to load deadlines. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of deadlines
  useEffect(() => {
    fetchDeadlines();
  }, []);

  // Check if we have a new deadline from navigation params
  useEffect(() => {
    if (route.params?.newDeadline) {
      const { title, due_date } = route.params.newDeadline;
      
      // Create deadline through API
      const createNewDeadline = async () => {
        try {
          await DeadlinesService.createDeadline({
            title,
            due_date
          });
          // Refresh deadlines list
          fetchDeadlines();
        } catch (err) {
          console.error('Error creating deadline:', err);
          setError('Failed to create deadline. Please try again.');
        }
      };
      
      createNewDeadline();
      
      // Clear the navigation params
      navigation.setParams({ newDeadline: undefined });
    }
  }, [route.params?.newDeadline]);

  // Reset form to default values
  const resetForm = () => {
    setCurrentDeadline({
      title: '',
      due_date: new Date().toISOString().split('T')[0] + 'T15:00:00' // Default to today at 3:00 PM
    });
    setSelectedDeadlineId(null);
    setIsEditing(false);
  };
  
  // Open modal to add a new deadline
  const handleAddDeadline = () => {
    resetForm();
    setModalVisible(true);
  };

  // Handle editing a deadline
  const handleEditDeadline = (deadline: Deadline) => {
    setCurrentDeadline({
      title: deadline.title,
      due_date: deadline.due_date
    });
    setSelectedDeadlineId(deadline.id);
    setIsEditing(true);
    setModalVisible(true);
  };

  // Handle deleting a deadline
  const handleDeleteDeadline = (id: number) => {
    Alert.alert(
      'Delete Deadline',
      'Are you sure you want to delete this deadline?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await DeadlinesService.deleteDeadline(id);
              // Update local state
              setDeadlines(deadlines.filter((deadline) => deadline.id !== id));
            } catch (err) {
              console.error('Error deleting deadline:', err);
              setError('Failed to delete deadline. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Handle editing a deadline
  const handleEditSubmit = async () => {
    if (currentDeadline.title.trim() === '') {
      Alert.alert('Error', 'Please enter a title for your deadline.');
      return;
    }

    try {
      if (isEditing && selectedDeadlineId) {
        // Update existing deadline via API
        const updateData: DeadlineUpdate = {
          title: currentDeadline.title,
          due_date: currentDeadline.due_date
        };
        
        await DeadlinesService.updateDeadline(selectedDeadlineId, updateData);
        // Refresh the list
        fetchDeadlines();
      } else {
        // Create new deadline
        const createData: DeadlineCreate = {
          title: currentDeadline.title,
          due_date: currentDeadline.due_date
        };
        console.log('Creating deadline with data:', createData);
        
        await DeadlinesService.createDeadline(createData);
        // Refresh the list
        fetchDeadlines();
      }
      
      setModalVisible(false);
      resetForm();
    } catch (err) {
      console.error('Error saving deadline:', err);
      setError('Failed to save deadline. Please try again.');
    }
  };

  // Format the due date for display
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render individual deadline item
  const renderDeadlineItem = ({ item }: { item: Deadline }) => {
    return (
      <View style={styles.deadlineItem}>
        <View style={styles.deadlineContent}>
          <View style={styles.deadlineHeader}>
            <Text style={styles.deadlineMessage}>{item.title}</Text>
          </View>
          
          <Text style={styles.deadlineEmail}>Due: {formatDueDate(item.due_date)}</Text>
        </View>
        
        <View style={styles.deadlineActions}>
          <TouchableOpacity onPress={() => handleEditDeadline(item)} style={styles.actionButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleDeleteDeadline(item.id)} style={styles.actionButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Empty state when no deadlines
  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Loading deadlines...</Text>
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateText, { color: COLORS.ERROR }]}>{error}</Text>
          <TouchableOpacity onPress={fetchDeadlines} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          No deadlines yet. Tap the + button to add one!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWithButton}>
        <Text style={styles.screenTitle}>Deadlines</Text>
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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
      
      {/* Floating Action Button for creating deadlines */}
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={handleAddDeadline}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

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
            
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={currentDeadline.title}
              onChangeText={(text) => 
                setCurrentDeadline({...currentDeadline, title: text})
              }
              placeholder="Enter deadline title"
              placeholderTextColor={COLORS.LIGHT_GRAY}
            />
            
            <Text style={styles.inputLabel}>Due Date and Time</Text>
            <TextInput
              style={styles.input}
              value={currentDeadline.due_date}
              onChangeText={(text) => 
                setCurrentDeadline({...currentDeadline, due_date: text})
              }
              placeholder="YYYY-MM-DDThh:mm:ss (e.g. 2025-06-25T15:00:00)"
              placeholderTextColor={COLORS.LIGHT_GRAY}
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
                onPress={handleEditSubmit}
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
