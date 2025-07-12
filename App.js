import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Linking, Dimensions} from 'react-native';

// Get screen dimensions for responsive design
const screenWidth = Dimensions.get('window').width;
const isWeb = screenWidth > 768; // Detect if running on web

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [finlandTime, setFinlandTime] = useState('');
  const [status, setStatus] = useState('');

  // Phone numbers for WhatsApp (replace with real numbers)
  const registeredPhones = [
    '358123456789',    // Finland number (replace with real)
    '358987654321',    // Another Finland number (replace with real)
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const finlandTimeString = now.toLocaleString('en-US', {
        timeZone: 'Europe/Helsinki',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setFinlandTime(finlandTimeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp function (web-compatible)
  const sendWhatsAppMessage = async (phoneNumber, message) => {
    try {
      const cleanPhone = phoneNumber.replace(/[+\s-]/g, '');
      console.log(`Sending to: ${cleanPhone}`);
      console.log(`Message: ${message}`);
      
      if (isWeb) {
        // For web, use WhatsApp Web
        const webURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(webURL, '_blank');
        return true;
      } else {
        // For mobile, use app URL
        const whatsappURL = `whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
        const canOpenWhatsApp = await Linking.canOpenURL(whatsappURL);
        
        if (canOpenWhatsApp) {
          await Linking.openURL(whatsappURL);
          return true;
        } else {
          // Fallback to web WhatsApp
          const webURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
          await Linking.openURL(webURL);
          return true;
        }
      }
    } catch (error) {
      console.error('WhatsApp error:', error);
      return false;
    }
  };

  // Send to first phone (for testing)
  const sendToFirstPhone = async (message) => {
    if (registeredPhones.length > 0) {
      const success = await sendWhatsAppMessage(registeredPhones[0], message);
      if (success) {
        setStatus('✅ Message sent!');
      } else {
        setStatus('❌ Failed to send');
      }
    } else {
      setStatus('❌ No phones registered');
    }
    setTimeout(() => setStatus(''), 3000);
  };

  // Handle Start button
  const handleStartPress = () => {
    const message = `🚀 STARTED at ${finlandTime}`;
    console.log('Start button pressed');
    sendToFirstPhone(message);
  };

  // Handle End button
  const handleEndPress = () => {
    const message = `🏁 ENDED at ${finlandTime}`;
    console.log('End button pressed');
    sendToFirstPhone(message);
  };

  // Home page with new design
  if (currentPage === 'home') {
    return (
      <View style={styles.container}>
        {/* Header with driver image */}
        <View style={styles.headerSection}>
          <Image 
            source={require('./assets/driverImage.png')}
            style={styles.headerImage}
          />
        </View>
        
        {/* Main content with centered buttons */}
        <View style={styles.bodySection}>
          <TouchableOpacity 
            style={[styles.mainButton, styles.riderButton]}
            onPress={() => setCurrentPage('second')}
          >
            <Text style={styles.mainButtonText}>I am a Rider</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.mainButton, styles.adminButton]}
            onPress={() => setCurrentPage('admin')}
          >
            <Text style={styles.mainButtonText}>Administrator Login</Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Footer</Text>
        </View>
      </View>
    );
  }

  // Rider page (your original second page)
  if (currentPage === 'second') {
    return (
      <View style={styles.secondPage}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Rider Dashboard</Text>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>🇫🇮 Finland Current Time:</Text>
            <Text style={styles.timeDisplay}>{finlandTime}</Text>
          </View>
          
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
          
          {/* Status display */}
          {status ? (
            <Text style={styles.statusText}>{status}</Text>
          ) : null}
          
          <Text style={styles.phoneCountText}>
            📞 {registeredPhones.length} phones registered
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.bottomLeftButton}
          onPress={() => setCurrentPage('home')}
        >
          <Text style={styles.buttonText}>← Go Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Admin page (new)
  if (currentPage === 'admin') {
    return (
      <View style={styles.adminPage}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Administrator Panel</Text>
          
          <View style={styles.adminContainer}>
            <Text style={styles.adminText}>Admin Dashboard Coming Soon...</Text>
            <Text style={styles.subText}>Manage drivers, view reports, and more.</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.bottomLeftButton}
          onPress={() => setCurrentPage('home')}
        >
          <Text style={styles.buttonText}>← Go Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Header section
  headerSection: {
    width: '100%',
    height: isWeb ? 350 : 280,
    backgroundColor: '#fff',
    overflow: 'hidden',
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  
  // Body section with buttons
  bodySection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: isWeb ? 60 : 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  
  // Main buttons (I am a Rider, Administrator Login)
  mainButton: {
    width: isWeb ? '60%' : '90%',
    maxWidth: 500,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  riderButton: {
    backgroundColor: '#007AFF',
  },
  adminButton: {
    backgroundColor: '#4CAF50',
  },
  mainButtonText: {
    color: 'white',
    fontSize: isWeb ? 20 : 18,
    fontWeight: 'bold',
  },
  
  // Footer
  footerSection: {
    height: 80,
    backgroundColor: '#B0E0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  
  // Second page (Rider dashboard)
  secondPage: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: isWeb ? 28 : 24,
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
    width: isWeb ? '60%' : '95%',
    maxWidth: 600,
    marginBottom: 40,
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  timeDisplay: {
    fontSize: isWeb ? 42 : 36,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  centeredButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    width: isWeb ? 140 : 120,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#25D366',
  },
  endButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  phoneCountText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomLeftButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Admin page
  adminPage: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  adminContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: isWeb ? '60%' : '95%',
    maxWidth: 600,
  },
  adminText: {
    fontSize: isWeb ? 24 : 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default App;