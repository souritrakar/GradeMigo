import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Provider as PaperProvider, Portal, Modal, TextInput, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from 'react-native-dropdown-picker';

import { db } from '../firebase/config'; // update with your path to firestore config
import { collection, addDoc } from "@firebase/firestore"; 
export default function CreateExamScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Class 10 NCERT Science', value: 'X_Science_Science.pdf' },
    { label: 'Class 11 Chemistry Part 1', value: 'XI_ChemistryP1.pdf' },
    {label:'Class 11 Biology', value:'XI_Biology.pdf'},
    {labe:'Class 11 Themes in World History', value:''}

  ]);

  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [modals, setModals] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [questionContent, setQuestionContent] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [exams, setExams] = useState([]);

  const addModal = () => {
    const newModals = [...modals];
    newModals.push(true);
    setModals(newModals);
  };

  const closeAllModals = () => {
    setModals([]);
  };

  const createExam = async () => {
    const examData = {
      examName: name,
      book: value,
      questions: savedQuestions
    };
    
    
  try {
    const docRef = await addDoc(collection(db, "exams"), examData).then(()=>{
      navigation.navigate("HomeScreen")
    })
  } catch (error) {
    console.error("Error adding document: ", error);
  }
  };

  const saveModal = (index) => {
    const newModals = [...modals];
    const savedModal = newModals.splice(index, 1);
    setModals(newModals);
    setSavedQuestions([...savedQuestions, { question: questionContent, marks: maxMarks }]);
    setQuestionContent('');
    setMaxMarks('');
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: '80%', // Adjust the width as desired
    height: 380, // Adjust the height as desired
    alignSelf: 'center',
    borderRadius: 10,
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Portal>
          {modals.map((modal, index) => (
            <Modal
              key={index}
              visible={modal}
              onDismiss={closeAllModals}
              contentContainerStyle={containerStyle}
            >
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>Add New Question</Text>
                <TextInput
                  style={styles.questionInput}
                  label="Enter Question"
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  contentStyle={{ fontFamily: "Rubik-Regular" }}
                  value={questionContent}
                  onChangeText={setQuestionContent}
                />

                <TextInput
                  style={styles.numberInput}
                  label="Enter Maximum Marks"
                  mode="outlined"
                  keyboardType="numeric"
                  contentStyle={{ fontFamily: "Rubik-Regular" }}
                  value={maxMarks}
                  onChangeText={setMaxMarks}
                />

                <View style={{ marginTop: 20 }}>
                  <Button onPress={() => saveModal(index, questionContent, maxMarks)} mode="contained">Save</Button>
                </View>
              </View>
            </Modal>
          ))}
        </Portal>

        <View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: 10 }}>
            <View>
              <Text style={{ fontFamily: "Rubik-SemiBold", marginTop: 20, marginLeft: 20, fontSize: 20 }}>
                Create new exam
              </Text>
            </View>

            <View style={{ marginTop: 15 }}>
              <Button mode="contained" onPress={createExam}>
                <Text>Create exam</Text>
              </Button>
            </View>
          </View>

          <View style={{ paddingHorizontal: 15, marginTop: 20, marginBottom: 20 }}>
            <TextInput
              style={styles.examField}
              label="Enter Exam Name"
              mode="outlined"
              onChangeText={setName}
              contentStyle={{ fontFamily: "Rubik-Regular" }}
            />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select a book"
              textStyle={{ fontFamily: "Rubik-Regular", fontSize: 15 }}
              style={{ borderRadius: 5, marginTop: 10 }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", zIndex: -50, justifyContent: "space-between", marginRight: 10 }}>
            <View>
              <Text style={{ fontFamily: "Rubik-SemiBold", marginTop: 20, marginLeft: 20, fontSize: 20 }}>
                Added questions
              </Text>
            </View>

            <TouchableOpacity onPress={addModal} style={{ marginTop: 15 }}>
              <Icon
                style={{ backgroundColor: "#e6ede8", borderRadius: 10 }}
                name="md-add"
                size={35}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.savedQuestionsContainer}>
          {savedQuestions.map((modal, index) => (
            <View key={index} style={styles.savedModalCard}>
              <Text style={styles.savedModalQuestion}>Question {index + 1}</Text>
              <Text style={styles.savedModalText}>{modal.question}</Text>
              <Text style={styles.savedModalText}>Marks: {modal.marks}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalContent: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 20,
    fontFamily: "Rubik-SemiBold",
    marginBottom: 20,
  },
  questionInput: {
    fontFamily: "Rubik-Regular",
    marginBottom: 10,
  },
  numberInput: {
    fontFamily: "Rubik-Regular",
  },
  savedQuestionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  savedModalCard: {
    backgroundColor: "#e6ede8",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    minWidth: "48%",
    marginLeft: 20,
    marginRight: 10,
  },
  savedModalQuestion: {
    fontFamily: "Rubik-SemiBold",
    marginBottom: 5,
  },
  

  savedModalText: {
    fontFamily: "Rubik-Regular",
  },
  examField: {
    fontFamily: "Rubik-Regular",
  },
});


