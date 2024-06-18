import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ColorPicker from "react-native-wheel-color-picker";
import tinycolor from "tinycolor2";

import { postCate } from "../../../api/category/postCate";

const CategoryAdd = () => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [categoryName, setCategoryName] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const handleColorChange = (colorHsvOrRgb) => {
    const colorHex = tinycolor(colorHsvOrRgb).toHexString();
    setSelectedColor(colorHex);
  };

  const handleComplete = async () => {
    try {
      const categoryData = {
        categoryName: categoryName,
        categoryColor: selectedColor,
      };

      const { deviceID } = useLocalSearchParams();

      const result = await postCate(deviceID, categoryData);

      if (result) {
        console.log("Category added successfully:", result);
        goBack();
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>🍪 카테고리 추가</Text>
      </View>

      <View style={styles.centeredContainer}>
        <View style={styles.editContainer}>
          <View style={styles.selectedColor}>
            <ColorPicker
              color={selectedColor}
              sliderSize={20}
              onColorChange={handleColorChange}
              style={{ flex: 1 }}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="카테고리를 입력하세요"
            placeholderTextColor="black"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.buttonStyle}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  titleHeader: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "#594E4E",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
  editContainer: {
    backgroundColor: "#F1F1F1",
    width: 600,
    height: 700,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColor: {
    width: 400,
    height: 500,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 15,
  },
  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "#FFFFFF",
    color: "#000000",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    padding: 5,
  },

  completeButton: {
    marginBottom: 10,
    width: 70,
    height: 50,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    fontSize: 25,
  },
});

export default CategoryAdd;