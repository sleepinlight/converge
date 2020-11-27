import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  TextInput,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import AdaptiveCard from "react-native-adaptivecards";
import { firebase } from "../firebase/config";

export default function AddFragmentScreen(props: any) {
  const [image, setImage] = useState(null);
  const [imageIsStaged, setImageIsStaged] = useState(false);
  const [titleText, setTitle] = useState("");
  const [notesText, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [fragments, setFragments] = useState([]);
  const fragmentRef = firebase.firestore().collection("fragments");
  const userID = props.extraData.id;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    fragmentRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const newFragments: any = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newFragments.push(entity);
          });
          setFragments(newFragments);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddNewFragment = () => {
    //TODO: upload image in right format for firebase
    if (titleText && titleText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: titleText,
        notesText: notesText,
        image: image ? image : "",
        authorID: userID,
        createdAt: timestamp,
      };
      fragmentRef
        .add(data)
        .then((_doc) => {
          setTitle("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const onAddImage = async () => {
    setLoading(true);
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageIsStaged(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    //     <View style={styles.container}>
    //     <View style={styles.formContainer}>
    //         {loading && <Text>Loading...</Text>}

    //         {/* <AdaptiveCard adaptiveCard={} payload={} /> */}
    //       <Text>Add a new fragment</Text>
    //       {image && <ImageBackground source={{ uri: image as any }} style={styles.image} >
    //       <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    //             <Text>Centered text</Text>
    //       </View>
    //      </ImageBackground>}
    //       <TouchableOpacity style={styles.button} onPress={onAddImage}>
    //                 <Text style={styles.buttonText}>Add Image</Text>
    //        </TouchableOpacity>

    //     </View>
    //     <View style={styles.formContainer}>
    //         <View style={styles.formFieldContainer}>
    //         <TextInput
    //                 style={styles.input}
    //                 placeholder='Add Title'
    //                 placeholderTextColor="#aaaaaa"
    //                 onChangeText={(text) => setTitle(text)}
    //                 value={titleText}
    //                 underlineColorAndroid="transparent"
    //                 autoCapitalize="none"
    //             />
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder='Add Notes'
    //                 placeholderTextColor="#aaaaaa"
    //                 onChangeText={(text) => setNotes(text)}
    //                 value={notesText}
    //                 underlineColorAndroid="transparent"
    //                 autoCapitalize="none"
    //             />
    //         </View>

    //     </View>
    //   </View>

    <View style={styles.newContainer}>
      <View style={styles.topContainer}>
        {image && (
          <ImageBackground source={{ uri: image as any }} style={styles.image}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Centered text</Text>
            </View>
          </ImageBackground>
        )}
        <TouchableOpacity style={styles.button} onPress={onAddImage}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ height: 50 }}>
          <TextInput
            style={styles.input}
            placeholder="Add Title"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setTitle(text)}
            value={titleText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={{ height: 50 }}>
          <TextInput
            style={styles.input}
            placeholder="Add Notes"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setNotes(text)}
            value={notesText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={onAddNewFragment}>
          <Text style={styles.buttonText}>Add Fragment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  topContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 2,
    justifyContent: "flex-start",
    width: "90%",
    margin: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "column",

    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  formFieldContainer: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 105,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
  },
});
