// App.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Linking, Alert} from 'react-native';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [finlandTime, setFinlandTime] = useState('');

  const registeredPhones = [
    '358444673113',  // Finland number example
    '358417426720',  // Another Finland number
    // Add more numbers as needed
  ];

  // Update Finland time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Finland is in Europe/Helsinki timezone
      const finlandTimeString = now.toLocaleString('en-US', {
        timeZone: 'Europe/Helsinki',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24-hour format
      });
      setFinlandTime(finlandTimeString);
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

   // Function to send WhatsApp message
  const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'WhatsApp is not installed on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
      console.log('WhatsApp error:', error);
    }
  };

  // Function to send message to all registered phones
  const sendToAllPhones = (message) => {
    registeredPhones.forEach((phoneNumber, index) => {
      setTimeout(() => {
        sendWhatsAppMessage(phoneNumber, message);
      }, index * 1000); // 1 second delay between each message
    });
  };

  // Handle Start button press
  const handleStartPress = () => {
    const message = `🚀 STARTED at ${finlandTime} (Finland Time)`;
    sendToAllPhones(message);
    Alert.alert('Start', 'Sending start notifications to registered phones');
  };

  // Handle End button press
  const handleEndPress = () => {
    const message = `🏁 ENDED at ${finlandTime} (Finland Time)`;
    sendToAllPhones(message);
    Alert.alert('End', 'Sending end notifications to registered phones');
  };

  // Home page
  if (currentPage === 'home') {
    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Image 
            source={require('./assets/driverImage.png')}
            style={styles.headerImage}
          />
        </View>
        
        <View style={styles.bodySection}>
          <TouchableOpacity 
            style={styles.bigButton}
            onPress={() => setCurrentPage('second')} // ✅ Use setState, not navigation
          >
            <Text style={styles.buttonText}>I am a Rider</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>Administrator Login</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footerSection}>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }

  // Second page
  // Second page with side-by-side buttons
if (currentPage === 'second') {
  return (
    <View style={styles.secondPage}>
      <View style={styles.centerContent}>
        <Text style={styles.title}>Welcome to Second Page!</Text>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>🇫🇮 Finland Current Time:</Text>
          <Text style={styles.timeDisplay}>{finlandTime}</Text>
        </View>
        
        {/* WhatsApp notification buttons */}
          <View style={styles.centeredButtonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.startButton]}
              onPress={handleStartPress}
            >
              <Text style={styles.actionButtonText}>📱 Start</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.endButton]}
              onPress={handleEndPress}
            >
              <Text style={styles.actionButtonText}>📱 End</Text>
            </TouchableOpacity>
          </View>
          
          {/* Show registered phones count */}
          <Text style={styles.phoneCountText}>
            📞 {registeredPhones.length} phones registered
          </Text>
        </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setCurrentPage('home')}
      >
        <Text style={styles.buttonText}>← Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}


  // Third page (optional)
  if (currentPage === 'third') {
    return (
      <View style={styles.thirdPage}>
        <Text style={styles.title}>This is Third Page!</Text>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentPage('home')}
        >
          <Text style={styles.buttonText}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bodySection: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerSection: {
    backgroundColor: 'powderblue',
    flex: 0.20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigButton: {
    backgroundColor: '#007AFF',
    width: '80%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallButton: {
    backgroundColor: '#34C759',
    width: '60%',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Second page
  secondPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    padding: 20,
  },
  // Side-by-side buttons container
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  timeContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: '95%',
    marginBottom: 40,           // More space below time
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  timeDisplay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  
  // Centered buttons container
  centeredButtonsContainer: {
    flexDirection: 'row',           // Side by side
    justifyContent: 'center',       // Center horizontally
    alignItems: 'center',           // Center vertically
    width: '100%',                  // Full width of parent
  },
  
  // Common button style
  actionButton: {
    width: 80,                     // Fixed width for consistent size
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,           // Space between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Start button (left)
  startButton: {
    backgroundColor: '#4CAF50',     // Green
  },
  
  // End button (right)
  endButton: {
    backgroundColor: '#F44336',     // Red
  },
  
  // Button text
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  
  // Third page
  thirdPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcoral',
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',       // Fixed positioning
    bottom: 40,                 // 40px from bottom
    left: 20,                   // 20px from left
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeDisplay: {
    fontSize: 32,              // Much bigger (was 20)
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  timeLabel: {
    textAlign: 'center',
  }
});

export default App;