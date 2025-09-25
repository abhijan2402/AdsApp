import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLOR} from '../Constants/Colors';

const FiltersModal = ({visible, onClose}) => {
  const [selectedFilter, setSelectedFilter] = useState('Soonest');

  const filters = ['Soonest', 'Lowest Price', 'Highest Rated'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filters</Text>

          <ScrollView>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilter === filter && styles.filterOptionActive,
                ]}
                onPress={() => setSelectedFilter(filter)}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetButton} onPress={onClose}>
              <Text style={styles.resetButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLOR.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLOR.textDark,
    marginBottom: 15,
  },
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLOR.lightGrey,
  },
  filterOptionActive: {
    backgroundColor: COLOR.lightGrey + '33',
  },
  filterText: {
    fontSize: 15,
    color: COLOR.textDark,
  },
  filterTextActive: {
    color: COLOR.primary,
    fontWeight: '600',
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR.lightGrey,
    borderRadius: 8,
  },
  resetButtonText: {
    color: COLOR.textDark,
    fontWeight: '600',
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR.primary,
    borderRadius: 8,
  },
  applyButtonText: {
    color: COLOR.white,
    fontWeight: '600',
  },
});
