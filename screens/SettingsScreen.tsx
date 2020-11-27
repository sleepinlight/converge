import React from 'react';
import { View, FlatList, StyleSheet, Text} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from '../navigation';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

export default function SettingsScreen(props: any) {
    const appSettings = [
        {id: 'theme',
         description: 'App Theme',
         valueType: 'list',
         values: ['Light', 'Dark', 'Device Theme']
        },

    ]
    const settings = props.settings || appSettings;

    const renderSetting = ({item}: any) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {item.description}
                </Text>
            </View>
        )
    }
  
    return (
        <View>
        {settings && (
            <View style={styles.listContainer}>
                <FlatList
                    data={settings}
                    renderItem={renderSetting}
                    keyExtractor={(item: any) => item.id}
                    removeClippedSubviews={true}
                />
            </View>
        )}
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})