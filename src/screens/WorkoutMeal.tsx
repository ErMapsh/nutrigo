import React, {memo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {
  Appbar,
  Button,
  Card,
  Icon,
  PaperProvider,
  withTheme,
} from 'react-native-paper';
import {z} from 'zod';
import {to12Hr} from '../utils/common';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const beforeworkoutPlanSchema = z.object({
  beforeworktime: z.string().min(1, 'Before workout time is required'),
  beforeworkoutmeal: z.string().min(4, 'Before workout meal is required'),
});

const afterworkoutPlanSchema = z.object({
  afterworkouttime: z.string().min(1, 'After workout time is required'),
  afterworkoutmeal: z.string().min(4, 'After workout meal is required'),
});

interface datatype {
  value: string;
  label: string;
}

const OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

function WorkoutMeal({navigation, theme}: any) {
  const [id, setid] = useState<number>(0);
  const data = [
    {
      value: 1,
      label: 'None',
    },
    {
      value: 2,
      label: 'Pre-workout',
    },
    {
      value: 3,
      label: 'Post-workout',
    },
    {
      value: 4,
      label: 'Both',
    },
  ];

  const [openTime, setopenTime] = useState(false);

  const [openbeforetime, setopenbeforetime] = useState(false);
  const [beforeworktime, setbeforeworktime] = useState('');
  const [beforeworkoutmeal, setbeforeworkoutmeal] = useState('');

  const [openaftertime, setopenaftertime] = useState(false);
  const [afterworkoutime, setafterworkoutime] = useState('');
  const [afterwrokoutmeal, setafterwrokoutmeal] = useState('');

  const reset = () => {
    setbeforeworktime('');
    setbeforeworkoutmeal('');
    setopenbeforetime(false);
    setafterworkoutime('');
    setafterwrokoutmeal('');
    setopenaftertime(false);
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleBefore = (date: Date) => {
    try {
      const time: string = to12Hr(date);
      setbeforeworktime(time);
    } catch (error) {}
  };

  const handleAfter = (date: Date) => {
    try {
      const time: string = to12Hr(date);
      setafterworkoutime(time);
    } catch (error) {}
  };

  const validate_Submit = async () => {
    try {
      const validationResult = beforeworkoutPlanSchema.safeParse({
        beforeworktime,
        beforeworkoutmeal,
      });

      const validation_result = afterworkoutPlanSchema.safeParse({
        afterworkoutime,
        afterwrokoutmeal,
      });
      
      console.log('id', id, !validationResult, !validation_result.success);
      if (
        (id == 2 && !validationResult.success) ||
        (id == 3 && !validation_result.success) ||
        (id == 4 &&
          (!validationResult.success || !validation_result.success)) ||
        id == 0
      ) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: 'Invalid data to process',
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'successful',
        });
      }
    } catch (error) {}
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header
        style={{
          backgroundColor: '#FFF',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
        }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Workout Meal Details"
          style={{alignItems: 'center'}}
        />
        <Appbar.Action icon="headset" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView style={{flex: 1}} scrollEnabled={true}>
        <View
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            padding: 18,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Please describe the meals you eat before or after your workout, if
            any.
          </Text>
        </View>
        <View style={{padding: 16, flex: 1}}>
          <Card
            mode="contained"
            style={{
              marginBottom: 16,
              backgroundColor: 'white',
              padding: 20,
            }}>
            <View>
              <Text
                style={{fontWeight: 'bold', color: 'black', fontSize: 15.5}}>
                Besides the recall you shared, are there any additional
                pre-workout or post-workout meals you consume?
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="please select"
                value={id}
                onChange={item => {
                  setid(item.value);
                  reset();
                }}
                renderItem={renderItem}
              />
            </View>
          </Card>

          {(id == 2 || id == 4) && (
            <Card
              mode="contained"
              style={{
                marginBottom: 16,
                backgroundColor: 'white',
                padding: 20,
              }}>
              <DatePicker
                mode="time"
                is24hourSource={'device'}
                modal
                open={openbeforetime}
                date={new Date()}
                theme="light"
                onConfirm={handleBefore}
                onCancel={() => setopenbeforetime(false)}
              />
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
                  What is your usual pre-workout meal?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 14}}>
                    Time:
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 12}}
                    onPress={() => {
                      setopenbeforetime(true);
                    }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <TextInput
                        value={beforeworktime}
                        editable={false}
                        style={{
                          borderBottomWidth: 1,
                          borderColor: 'grey',
                          padding: 0,
                          width: '60%',
                          color: 'black',
                          paddingStart: 12,
                        }}
                        placeholderTextColor="grey"
                        placeholder="Select Time"
                      />
                      <View
                        style={{
                          position: 'relative',
                          right: '7%',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          source={require('../assets/icons/down.png')}
                          size={12}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 4,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 14,
                      marginBottom: 4,
                    }}>
                    Menu Options:
                  </Text>
                  <TextInput
                    value={beforeworkoutmeal}
                    style={{
                      borderBottomWidth: 1,
                      padding: 0,
                      color: 'black',
                      borderColor: 'grey',
                    }}
                    placeholder={`eg.banana, black coffie, nuts`}
                    onChangeText={setbeforeworkoutmeal}
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
            </Card>
          )}

          {(id == 3 || id == 4) && (
            <Card
              mode="contained"
              style={{
                marginBottom: 16,
                backgroundColor: 'white',
                padding: 20,
              }}>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
                  What is your usual post-workout meal?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 14}}>
                    Time:
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 12}}
                    onPress={() => {
                      setopenaftertime(true);
                    }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <DatePicker
                        mode="time"
                        is24hourSource={'device'}
                        modal
                        open={openaftertime}
                        date={new Date()}
                        theme="light"
                        onConfirm={handleAfter}
                        onCancel={() => setopenaftertime(false)}
                      />
                      <TextInput
                        value={afterworkoutime}
                        editable={false}
                        style={{
                          borderBottomWidth: 1,
                          borderColor: 'grey',
                          padding: 0,
                          width: '60%',
                          color: 'black',
                          paddingStart: 12,
                        }}
                        placeholderTextColor="grey"
                        placeholder="Select Time"
                      />
                      <View
                        style={{
                          position: 'relative',
                          right: '7%',
                          justifyContent: 'center',
                        }}>
                        <Icon
                          source={require('../assets/icons/down.png')}
                          size={12}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginVertical: 4,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 14,
                      marginBottom: 4,
                    }}>
                    Menu Options:
                  </Text>
                  <TextInput
                    value={afterwrokoutmeal}
                    style={{
                      borderBottomWidth: 1,
                      padding: 0,
                      color: 'black',
                      borderColor: 'grey',
                    }}
                    placeholder={`eg.Protien bar, protien powser, panner`}
                    onChangeText={setafterwrokoutmeal}
                    placeholderTextColor="grey"
                  />
                </View>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={{width: '100%', borderRadius: 0}}
        contentStyle={{padding: 8}}
        labelStyle={{fontWeight: 'bold', fontSize: 15}}
        onPress={validate_Submit}>
        Submit
      </Button>
    </View>
  );
}

export default memo(withTheme(WorkoutMeal));

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },
  textItem: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  dropdown: {
    marginTop: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
