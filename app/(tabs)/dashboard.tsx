import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            {/* Add your dashboard content here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
});
