import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Modal, TextInput, PaperProvider, Portal } from "react-native-paper";
import StudentCard from "../components/StudentCard";
import { addDoc, collection } from "@firebase/firestore";
import {db} from "../firebase/config"
import { useRoute } from "@react-navigation/native";

export default function ExamScreen({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState("")
  const [studentClass, setStudentClass] = useState("")

  const route = useRoute(); // Access the route object using useRoute hook
  const { title, subtitle } = route.params; 

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const fetchedStudents = [];
  
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        fetchedStudents.push(studentData);
      });
  
      setStudents(fetchedExams);
    };
  
    fetchStudents();
  });

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const createStudent = async () => {
    const studentData = {
      examName: name,
      book: value,
      questions: savedQuestions
    };
    
    
  try {
    const docRef = await addDoc(collection(db, "students"), examData).then(()=>{
      navigation.navigate("HomeScreen")
    })
  } catch (error) {
    console.error("Error adding document: ", error);
  }
  };

  
  return (
    <PaperProvider>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}> 
      <Portal> 
        <Modal  visible={isModalVisible} onDismiss={closeModal}>
        
        <View style={styles.modalContainer}>
          <Text style = {{fontFamily: 'Rubik-SemiBold', fontSize: 20}}>Add New Student</Text>
          <TextInput
              style={{fontFamily: 'Rubik-Regular', marginTop: 10}}
              label="Enter Student Name"
              mode="outlined"
              multiline
                    // numberOfLines={4}
              contentStyle={{ fontFamily: "Rubik-Regular" }}
              value={studentName}
              onChangeText={setStudentName}
          />

          <TextInput
            style={{fontFamily: 'Rubik-SemiBold', marginTop: 20}}
            label="Enter Class"
            mode="outlined"
            keyboardType="numeric"
            contentStyle={{ fontFamily: "Rubik-Regular" }}
            value={studentClass}
            onChangeText={setStudentClass}
          />

          <Button mode="contained" style={{ marginTop: 30 }} onPress={createStudent}>
            Add
          </Button>
        </View>
      </Modal>
        </Portal>

      <View style={{ display: "flex", flexDirection: "row", zIndex: -50, justifyContent: "space-between", marginRight: 10 }}>
        <View>
          <Text style={{ fontFamily: "Rubik-SemiBold", marginTop: 25, marginLeft: 20, fontSize: 25, width: 200}}>
          {subtitle} 
          </Text>
          <Text style={{ fontFamily: "Rubik-Regular", marginLeft: 20, fontSize: 20 }}>
          Class XI
          </Text>
        </View>

        <View style={{ marginTop: 22}}>
          <Button mode="contained" style={{ marginTop: 5 }} onPress={openModal}>
            <Text>Add student</Text>
          </Button>
        </View>
      </View>

      <View>
        <Text style={{ fontFamily: "Rubik-SemiBold", marginTop: 25, marginLeft: 20, fontSize: 20 }}>
          Added students
        </Text>

        <View style={styles.cardContainer}>
          
          {
            <>
              <StudentCard  name={"Yusuf Limdiwala"} s_class={"Class XI"} onPress={()=>navigation.navigate("UploadScreen")} />
              <StudentCard  name={"Aritro Roy"} s_class={"Class XI"} onPress={()=>navigation.navigate("UploadScreen")} />
              <StudentCard  name={"Ayush Bosee"} s_class={"Class XI"} onPress={()=>navigation.navigate("UploadScreen")} />
              <StudentCard  name={"Soham Mukjerjee"} s_class={"Class XI"} onPress={()=>navigation.navigate("UploadScreen")} />
             
              </>
          }
        </View> 
      </View>

     
    </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 20
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 50,
    borderRadius: 10, 
    height: 300,
  }
});