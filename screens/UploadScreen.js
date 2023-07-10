import React, { useState } from "react";
import { View, Text, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity, Image, Platform  } from "react-native";
import { Button, Card } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import QuestionCard from "../components/QuestionCard";

export default function UploadScreen({route,navigation}) {
  const [questions, setQuestions] = useState([
    {name:"Yusuf Limdiwala?", total_marks: "1"},
              {name:"Yusuf Limdiwala?", total_marks: "2"},
              {name:"Yusuf Limdiwala?", total_marks: "5"},
              {name:"Yusuf Limdiwala?", total_marks: "5"},
              {name:"Yusuf Limdiwala?", total_marks: "5"}
  ])
  return (
    <TouchableWithoutFeedback>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ fontFamily: 'Rubik-SemiBold', fontSize: 25, marginLeft: 20, marginTop: 20, marginBottom: 20 }}>Questions</Text>

        <View style={{ paddingHorizontal: 15, rowGap: 15 }}>
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                name={question.name}
                total_marks={question.total_marks}
              />
            ))}
        </View>


       
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}



