import React, {memo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Appbar,
  Button,
  Card,
  Dialog,
  Icon,
  IconButton,
  Portal,
  withTheme,
} from 'react-native-paper';
import {ExpandableSection} from 'react-native-ui-lib';
import {to12Hr} from '../utils/common';
import {useDispatch, useSelector} from 'react-redux';
import {
  AddmoreMenuOption,
  mealtype,
  menuOptiontype,
  setHandleOpenDate,
  setOpen,
  updateMealTime,
  updateMenuOption,
} from '../redux/mealsSlice';
import {z} from 'zod';

const menuOptionSchema = z.object({
  id: z.number(),
  meal_id: z.number(),
  placeholder: z.string(),
  value: z.string().min(1, {message: 'Menu option cannot be empty'}),
  valid: z.boolean(),
});

const mealSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean(),
  time: z
    .string()
    .min(1, {message: 'Time cannot be empty for required meals'})
    .optional(),
  open: z.boolean(),
  opendate: z.boolean(),
  menu_options: z.array(menuOptionSchema),
  valid: z.boolean(),
});

const mealsSchema = z.array(mealSchema);

function FoodDetails({theme, navigation}: any) {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState<boolean>(false);
  const {meals, submitError} = useSelector((state: any) => state.meals);

  const handleDate = (date: Date, meal_id: number) => {
    console.log(date, meal_id);
    const time: string = to12Hr(date);
    dispatch(updateMealTime({time: time, id: meal_id}));
  };

  const RenderMenuOption = ({item}: {item: menuOptiontype}) => {
    return (
      <View
        style={{
          marginVertical: 4,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 16,
            marginRight: 6,
          }}>
          {item?.id}.
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            padding: 0,
            flex: 1,
            color: 'black',
            borderColor: 'grey',
          }}
          placeholder={`eg. ${item?.placeholder}`}
          value={item?.value}
          onChangeText={text => {
            dispatch(
              updateMenuOption({
                value: text,
                mealId: item.meal_id,
                mealOption: item.id,
              }),
            );
          }}
          placeholderTextColor="grey"
        />
      </View>
    );
  };

  const renderItem = ({item}: {item: mealtype}) => {
    return (
      <>
        <DatePicker
          mode="time"
          is24hourSource={'device'}
          modal
          open={item.opendate}
          date={new Date()}
          theme="light"
          onConfirm={date => handleDate(date, item.id)}
          onCancel={() =>
            dispatch(setHandleOpenDate({flag: false, id: item.id}))
          }
        />
        {item?.required ? (
          <Card
            mode="contained"
            style={{
              marginBottom: 16,
              backgroundColor: 'white',
              paddingVertical: 5,
              paddingStart: 20,
              paddingRight: 12,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: item.editable ? theme.colors.primary : 'grey',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.name} *
              </Text>
              <IconButton
                icon={item.open ? 'chevron-down-circle' : 'chevron-up-circle'}
                iconColor={item.editable ? theme.colors.primary : 'grey'}
                size={24}
                disabled={!item.editable}
                onPress={() => {
                  dispatch(setOpen(item.id));
                }}
              />
            </View>
            <ExpandableSection top expanded={item.open}>
              <View style={{paddingBottom: 12}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 22,
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 14}}>
                    Time:
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: 12}}
                    onPress={() => {
                      dispatch(setHandleOpenDate({flag: true, id: item.id}));
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        editable={false}
                        style={{
                          borderBottomWidth: 1,
                          borderColor: 'grey',
                          padding: 0,
                          width: '60%',
                          color: 'black',
                          paddingStart: 12,
                        }}
                        value={item.time}
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

                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 14,
                    marginBottom: 4,
                  }}>
                  Menu Options:
                </Text>
                <FlatList
                  data={item?.menu_options}
                  keyExtractor={(item: any, index: number) => `index${index}`}
                  renderItem={RenderMenuOption}
                  scrollEnabled={false}
                />
                <View style={{alignItems: 'flex-end', marginTop: 6}}>
                  <Button
                    disabled={!item.valid}
                    icon="plus-circle"
                    mode="text"
                    onPress={() => {
                      dispatch(AddmoreMenuOption(item.id));
                    }}>
                    Add More
                  </Button>
                </View>
              </View>
            </ExpandableSection>
          </Card>
        ) : (
          <Card
            mode="contained"
            style={{
              marginBottom: 16,
              backgroundColor: 'white',
              paddingVertical: 5,
              paddingStart: 20,
              paddingRight: 12,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: item.editable ? theme.colors.primary : 'grey',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
              <IconButton
                icon={item.open ? 'chevron-down-circle' : 'chevron-up-circle'}
                iconColor={item.editable ? theme.colors.primary : 'grey'}
                disabled={!item.editable}
                size={24}
                onPress={() => {
                  dispatch(setOpen(item.id));
                }}
              />
            </View>
            <ExpandableSection top expanded={item.open}>
              <View style={{paddingBottom: 12}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 22,
                  }}>
                  <Text
                    style={{color: 'black', fontWeight: '500', fontSize: 14}}>
                    Time:
                  </Text>
                  <TouchableOpacity
                    style={{marginLeft: 12}}
                    onPress={() => {
                      dispatch(setHandleOpenDate({flag: true, id: item.id}));
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        value={item.time}
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

                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: 14,
                    marginBottom: 4,
                  }}>
                  Menu Options:
                </Text>
                <FlatList
                  data={item.menu_options}
                  keyExtractor={(item: any, index: number) => `index${index}`}
                  renderItem={RenderMenuOption}
                  scrollEnabled={false}
                />
              </View>
            </ExpandableSection>
          </Card>
        )}
      </>
    );
  };

  const onSubmit = () => {
    try {
      if (!submitError) {
        navigation.navigate('WorkoutMeal');
      }
    } catch (error) {}
  };
  return (
    <View style={{flex: 1}}>
      <Portal>
        <Dialog
          visible={dialog}
          dismissable={false}
          style={{backgroundColor: '#fff'}}>
          <Dialog.Title
            style={{textAlign: 'center', fontSize: 17, fontWeight: 'bold'}}>
            Note !
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 15,
                textAlign: 'center',
              }}>
              In case you eat out or carry meals to office, do mention those in
              your recall too
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'center'}}>
            <Button
              onPress={() => {
                setDialog(false);
              }}
              mode="contained"
              contentStyle={{paddingHorizontal: 6}}
              style={{borderRadius: 25, width: '35%'}}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Appbar.Header
        style={{
          backgroundColor: '#FFF',
          // iOS Shadow Properties
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          // Android Elevation
          elevation: 8,
        }}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content
          title="Food Recall Details"
          style={{alignItems: 'center'}}
        />
        <Appbar.Action icon="headset" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView scrollEnabled={true}>
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
            Please tell us about the meals that you eat on a day-to-day basis.
            Mention a variety of options & not just one.
          </Text>
        </View>

        <View style={{padding: 16, flex: 1}}>
          <FlatList
            scrollEnabled={false}
            data={meals}
            renderItem={renderItem}
            keyExtractor={meal => meal.id.toString()}
            contentContainerStyle={{paddingBottom: 16}}
          />
        </View>
      </ScrollView>
      <Button
        mode="contained"
        style={{width: '100%', borderRadius: 0}}
        contentStyle={{padding: 8}}
        labelStyle={{fontWeight: 'bold', fontSize: 15}}
        onPress={onSubmit}>
        {submitError ? 'Next' : 'Submit'}
      </Button>
    </View>
  );
}

export default memo(withTheme(FoodDetails));
