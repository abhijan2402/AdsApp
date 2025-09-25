import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {COLOR} from '../Constants/Colors';
import FONT from '../Constants/Font';

const AddVehicleModal = ({visible, onClose, onSave, editingVehicle}) => {
  const [branch, setBranch] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [model, setModel] = useState('');
  const [launchYear, setLaunchYear] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (editingVehicle) {
      setBranch(editingVehicle.branch);
      setCarNumber(editingVehicle.carNumber);
      setModel(editingVehicle.model);
      setLaunchYear(editingVehicle.launchYear);
      setImages(editingVehicle.images || []);
    } else {
      resetForm();
    }
  }, [editingVehicle]);

  /** Reset form fields */
  const resetForm = () => {
    setBranch('');
    setCarNumber('');
    setModel('');
    setLaunchYear('');
    setImages([]);
  };

  /** Pick multiple images */
  const handleImagePick = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      cropping: false,
    }).then(selectedImages => {
      const newImages = selectedImages.map(img => img.path);
      setImages(prev => [...prev, ...newImages]); // Append to existing images
    });
  };

  /** Remove selected image */
  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  /** Save vehicle */
  const handleSave = () => {
    if (!branch || !carNumber || !model || !launchYear || images.length === 0) {
      alert('Please fill all fields and select at least one image');
      return;
    }
    onSave({branch, carNumber, model, launchYear, images});
    resetForm();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Branch */}
            <TextInput
              placeholder="Branch"
              placeholderTextColor={COLOR.grey}
              style={styles.input}
              value={branch}
              onChangeText={setBranch}
            />

            {/* Car Number */}
            <TextInput
              placeholder="Car Number"
              placeholderTextColor={COLOR.grey}
              style={styles.input}
              value={carNumber}
              onChangeText={setCarNumber}
            />

            {/* Model */}
            <TextInput
              placeholder="Model"
              placeholderTextColor={COLOR.grey}
              style={styles.input}
              value={model}
              onChangeText={setModel}
            />

            {/* Launch Year */}
            <TextInput
              placeholder="Launch Year"
              placeholderTextColor={COLOR.grey}
              style={styles.input}
              keyboardType="numeric"
              value={launchYear}
              onChangeText={setLaunchYear}
            />

            {/* Image Picker */}
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={handleImagePick}>
              <Text style={styles.imagePickerText}>Choose Car Images</Text>
            </TouchableOpacity>

            {/* Preview Selected Images */}
            {images.length > 0 && (
              <FlatList
                data={images}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={styles.imageWrapper}>
                    <Image source={{uri: item}} style={styles.previewImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}>
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
                )}
                style={{marginVertical: 10}}
                showsHorizontalScrollIndicator={false}
              />
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {editingVehicle ? 'Update' : 'Save'}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddVehicleModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLOR.white,
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONT.SemiBold,
    color: COLOR.textDark,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 14,
    color: COLOR.textDark,
    fontFamily: FONT.Regular,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: COLOR.lightGrey,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    fontSize: 14,
    color: COLOR.grey,
    fontFamily: FONT.Medium,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  previewImage: {
    width: 80,
    height: 70,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLOR.red,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: COLOR.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: COLOR.white,
    fontSize: 16,
    fontFamily: FONT.SemiBold,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  cancelButtonText: {
    color: COLOR.primary,
    fontSize: 15,
    fontFamily: FONT.Medium,
  },
});
