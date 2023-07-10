import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { db } from '../firebase/config'; // update with your path to firestore config
import { collection, getDocs } from "@firebase/firestore"; 
import ExamListCard from "../components/ExamListCard";

export default function HomeScreen({ navigation }) {

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const querySnapshot = await getDocs(collection(db, "exams"));
      const fetchedExams = [];
  
      querySnapshot.forEach((doc) => {
        const examData = doc.data();
        fetchedExams.push(examData);
      });
  
      setExams(fetchedExams);
    };
  
    fetchExams();
  });

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: 10 }}>
        <View elevation={0.2} style={styles.headContainer}>
          <Image style={{ width: 40, height: 40, marginLeft: 10, marginTop: 10, marginBottom: 7 }} source={require('../assets/logo.png')} />
          <Text style={styles.topHeader}>GradeMigo</Text>
        </View>

        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate("CreateExamScreen")}>
          <Icon
            style={{ backgroundColor: "#e6ede8", borderRadius: 10 }}
            name="md-add"
            size={35}
            color={"black"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <Text style={styles.createdHeader}>Created exams</Text>
        </View>

        <View style={styles.cardContainer}>
          {exams.map((exam, index) => (
            <ExamListCard
              key={index}
              title={exam.examName}
              subtitle={exam.book}
              onPress={() => navigation.navigate("ExamScreen", {title:exam.examName, subtitle:exam.book})}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headContainer: {
    display: "flex",
    flexDirection: "row",
  },
  topHeader: {
    color: "black",
    fontSize: 25,
    marginTop: 12,
    marginLeft: 10,
    marginBottom: 7,
    fontFamily: "Rubik-SemiBold",
  },
  createdHeader: {
    color: "black",
    fontSize: 22,
    marginTop: 18,
    marginLeft: 20,
    marginBottom: 7,
    fontFamily: "Rubik-SemiBold",
  },
  cardContainer: {
    marginTop: 20,

    justifyContent: 'space-between',
    paddingHorizontal: 20,
    rowGap:20
  },
});
