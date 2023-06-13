import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const AutoDialer = () => {
    const [callGap, setCallGap] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [autoDialerStatus, setAutoDialerStatus] = useState("");
    const [autoDialerActive, setAutoDialerActive] = useState(false);
    const [filteredNumbers, setFilteredNumbers] = useState([]);
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [paused,setPaused] = useState(false);
   

    const handleStartAutoDialer = () => {
      setAutoDialerStatus("Running");
      setAutoDialerActive(true);
      const parsedData = JSON.parse(jsonData);
      const filteredNumbers = parsedData
        .filter(number => number.status !== "skip")
        .sort((a, b) => a.Priority - b.Priority); 
      setFilteredNumbers(filteredNumbers);
      console.log(filteredNumbers);
    
    };
    const dialNextNumber = () => {
      const currentNumber = filteredNumbers[currentNumberIndex];
    
      if (currentNumber) {
        console.log("Dialing number:", currentNumber.Number);
        setAutoDialerStatus("Running");
    
        // dialing for 3 seconds
        callGapTimeout  = setTimeout(() => {
          console.log("Call disconnected for number:", currentNumber.Number);
   
        }
        
        , 3000);
      } else {
        // All numbers have been dialed
        
        setAutoDialerStatus("");
        setAutoDialerActive(false);
      }
    };
    
    useEffect(() => {
      if (autoDialerActive && !paused && currentNumberIndex < filteredNumbers.length) {
        
        dialNextNumber();
        dialNextNumberTimeout  = setTimeout(() => {
          setCurrentNumberIndex(currentNumberIndex + 1);
        }, callGap * 1000);
    
        
      }
    }, [autoDialerActive, currentNumberIndex, paused]);
    
    
    const handlePauseAutoDialer = () => {
      setPaused(true);
      setAutoDialerStatus("Paused");
    };
    
    const handleResumeAutoDialer = () => {
      setPaused(false);
      setAutoDialerStatus("Running");
    };
    
    const handleStopAutoDialer = () => {
      setPaused(false);
      setAutoDialerStatus("");
      setAutoDialerActive(false);
      setFilteredNumbers([]);
      setCurrentNumberIndex(0);
      setCallGap("");
      setJsonData("");
      clearTimeout(callGapTimeout);
      clearTimeout(dialNextNumberTimeout);
    
      // Clear the console
      console.clear();
    };
    

    

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Call Gap</Text>
          <Text>(in seconds)</Text>
        </View>
        <TextInput
          style={{
            height: 50,
            width: 140,
            backgroundColor: "#FFFFFF",
            padding: 4,
            textAlign: "center",
            borderWidth: 1,
            borderColor: "#CCCCCC",

          }}
          placeholder="type here..."
          keyboardType="numeric"
          value={callGap}
          onChangeText={(text) => setCallGap(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          marginTop: 35,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          insert JSON phone Data
        </Text>

        <TextInput
          style={{
            height: 200,
            width: "100%",
            backgroundColor: "#FFFFFF",
            padding: 4,
            borderWidth: 1,
            borderColor: "#CCCCCC",
      textAlignVertical: "top",
          }}
          placeholder="type here..."
          numberOfLines={200}
          multiline={true}
          value={jsonData}
          onChangeText={(text) => setJsonData(text)}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            display:!autoDialerStatus?"flex":"none",
            backgroundColor: "#085FE2",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleStartAutoDialer}
        >
            
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}>
            Start Auto Dialer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            display:(autoDialerActive && !paused)?"flex":"none",
            backgroundColor: "#FFCE31",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handlePauseAutoDialer} 
          disabled={!autoDialerActive || paused}
        >
            
          <Text style={{ fontSize: 16, fontWeight: "bold"}}>
            Pause Auto Dialer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            display:(autoDialerActive && paused)?"flex":"none",
            backgroundColor: "#FFCE31",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleResumeAutoDialer} 
          disabled={!autoDialerActive || !paused}
        >
            
          <Text style={{ fontSize: 16, fontWeight: "bold"}}>
            Resume Auto Dialer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            display:autoDialerActive?"flex":"none",
            backgroundColor: "#EC2929",
            padding: 10,
            marginTop: 20,
            borderRadius: 4,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleStopAutoDialer}
        >
            
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}>
            Stop Auto Dialer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.bottomContainer,{
            display:autoDialerActive?"flex":"none",

      }]}>
        <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: "bold" }}>
          Current Status
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Text>Auto Dialer:</Text>
          <Text>{autoDialerStatus} </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20, 
            display:(!paused && autoDialerActive)?"flex":"none",
    
    }}>
          <Text>Phone Number:</Text>
          <Text>{filteredNumbers[currentNumberIndex]?.Number}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 ,
            display:(!paused && autoDialerActive)?"flex":"none",
    
    }}>
          <Text>Priority Order:</Text>
          <Text>{filteredNumbers[currentNumberIndex]?.Priority}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: "bold",paddingTop:10,paddingLeft:25 }}>{(autoDialerActive && !paused)?`Call gap counter : ${callGap}(s)`:""}</Text>
    </View>
  );
};

export default AutoDialer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F8F6FB",
  },
  bottomContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
});
