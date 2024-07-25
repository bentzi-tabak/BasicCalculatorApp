import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 50) / 4;

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [currentOperation, setCurrentOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const calculate = (a, b, operation) => {
    switch(operation) {
      case '+': return a + b;
      case '-': return a - b;
      case 'X': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handlePress = (value) => {
    if (shouldResetDisplay) {
      setDisplay(value);
      setShouldResetDisplay(false);
      return;
    }

    switch(value) {
      case 'C':
        setDisplay('0');
        setCurrentOperation(null);
        setPreviousValue(null);
        break;
      case '+/-':
        setDisplay((parseFloat(display) * -1).toString());
        break;
      case '%':
        setDisplay((parseFloat(display) / 100).toString());
        break;
      case '=':
      case '+':
      case '-':
      case 'X':
      case '/':
        if (previousValue !== null && currentOperation) {
          const result = calculate(previousValue, parseFloat(display), currentOperation);
          setDisplay(result.toString());
          setPreviousValue(result);
        } else {
          setPreviousValue(parseFloat(display));
        }
        setCurrentOperation(value === '=' ? null : value);
        setShouldResetDisplay(true);
        break;
      default:
        setDisplay(display === '0' ? value : display + value);
    }
  };

  const buttons = [
    'C', '+/-', '%', '/',
    '7', '8', '9', 'X',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{display}</Text>
        </View>
        <View style={styles.buttons}>
          {buttons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                item === '=' ? styles.equalButton : null,
                ['C', '+/-', '%', '/', 'X', '-', '+'].includes(item) ? styles.operatorButton : null,
                item === '0' ? styles.zeroButton : null
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4B0082',
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  display: {
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#228B22',
    borderRadius: 10,
    marginBottom: 20,
  },
  displayText: {
    fontSize: 48,
    color: 'white',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: buttonWidth,
    height: buttonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: buttonWidth / 2,
    backgroundColor: '#cf21ba',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  equalButton: {
    backgroundColor: '#FF0000',
    width: buttonWidth * 2,
    borderRadius: buttonWidth / 2,
  },
  operatorButton: {
    backgroundColor: '#cf21ba',
  },
  zeroButton: {
    width: buttonWidth,
    borderRadius: buttonWidth / 2,
  },
});
