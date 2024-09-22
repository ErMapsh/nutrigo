import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, FlatList, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Appbar, Button, Card, Dialog, Icon, IconButton, Portal, withTheme } from 'react-native-paper';
import { ExpandableSection } from 'react-native-ui-lib';
import { to12Hr } from '../utils/common';

function FoodDetails({ theme, navigation }: any) {
    const [flag, setFlag] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);

    const [date, setDate] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const [menuOptions, setMenuOptions] = useState([{ value: '' }, { value: '' }]);

    const [midmorning, setmidmorning] = useState(null);
    const [flagmidmorning, setflagmidmorning] = useState(false)
    const _date = (date: Date) => {
        const time: string = to12Hr(date);
        setOpen(false);
        setDate(time);
    };

    const handleInputChange = (text: string, index: number) => {
        const newMenuOptions = [...menuOptions];
        newMenuOptions[index].value = text;
        setMenuOptions(newMenuOptions);
    };

    const addMenuOption = () => {
        setMenuOptions([...menuOptions, { value: '' }]);
    };

    const removeMenuOption = (index: number) => {
        const newMenuOptions = menuOptions.filter((_, i) => i !== index);
        setMenuOptions(newMenuOptions);
    };

    const renderMenu = ({ option, index }: any) => {
        return (
            <View key={index} style={{ marginVertical: 4, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Text style={{ fontWeight: "bold", color: 'black', fontSize: 16, marginRight: 6 }}>{index + 1}.</Text>
                <TextInput
                    style={{
                        borderBottomWidth: 1,
                        padding: 0,
                        flex: 1,
                        color: 'black',
                        borderColor: 'grey',
                    }}
                    placeholder={`eg. Upma + Apple juice`}
                    value={option?.value}
                    onChangeText={(text) => handleInputChange(text, index)}
                    placeholderTextColor="grey"
                />
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Portal>
                <Dialog visible={dialog} dismissable={false} style={{ backgroundColor: "#fff" }}>
                    <Dialog.Title style={{ textAlign: 'center', fontSize: 17, fontWeight: "bold" }}>Note !</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{ color: "black", fontWeight: "500", fontSize: 15, textAlign: "center" }}>
                            In case you eat out or carry meals to office, do mention those in your recall too
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions style={{ justifyContent: 'center' }}>
                        <Button
                            onPress={() => { setDialog(false); }}
                            mode='contained' contentStyle={{ paddingHorizontal: 6 }}
                            style={{ borderRadius: 25, width: '35%' }}
                        >
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Appbar.Header style={{
                backgroundColor: "#FFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 8,
            }}>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Food Recall Details" style={{ alignItems: 'center' }} />
                <Appbar.Action icon="headset" onPress={() => { }} />
            </Appbar.Header>
            <DatePicker
                mode='time'
                is24hourSource={"device"}
                modal
                open={open}
                date={new Date()}
                theme='light'
                onConfirm={_date}
                onCancel={() => setOpen(false)}
            />
            <ScrollView contentContainerStyle={{ justifyContent: 'space-between' }} scrollEnabled={true}>

                <View style={{
                    backgroundColor: theme.colors.secondaryContainer,
                    padding: 18
                }}>
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 16
                    }}>
                        Please tell us about the meals that you eat on a day-to-day basis. Mention a variety of options & not just one.
                    </Text>
                </View>

                <View style={{ padding: 16, flex: 1 }}>
                    {/* breakfast is required */}
                    <Card mode='contained' style={{
                        marginBottom: 16, backgroundColor: 'white', paddingVertical: 5, paddingStart: 20, paddingRight: 12
                    }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Breakfast*</Text>
                            <IconButton
                                icon={flag ? "chevron-down-circle" : "chevron-up-circle"}
                                iconColor={theme.colors.primary}
                                size={24}
                                onPress={() => { setFlag(!flag); }}
                            />
                        </View>
                        <ExpandableSection top expanded={flag}>
                            <View style={{ paddingBottom: 12 }}>
                                {/* Time Picker */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Time:</Text>
                                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setOpen(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: 'grey',
                                                    padding: 0,
                                                    width: '60%',
                                                    color: 'black',
                                                    paddingStart: 12
                                                }}
                                                value={date?.toString()}
                                                placeholderTextColor="grey"
                                                placeholder="Select Time"
                                            />
                                            <View style={{
                                                position: "relative",
                                                right: '7%',
                                                justifyContent: 'center'
                                            }}>
                                                <Icon
                                                    source={require('../assets/icons/down.png')}
                                                    size={12}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Menu Options:</Text>
                                <FlatList
                                    data={menuOptions}
                                    keyExtractor={(item: any, index: number) => `index${index}`}
                                    renderItem={renderMenu}
                                    scrollEnabled={false}
                                />
                                <View style={{ alignItems: 'flex-end', marginTop: 6 }}>
                                    <Button disabled icon="plus-circle" mode="text" onPress={addMenuOption}>
                                        Add More
                                    </Button>
                                </View>
                            </View>
                        </ExpandableSection>
                    </Card>

                    {/* midmoring is optional */}
                    <Card mode='contained' style={{
                        marginBottom: 16, backgroundColor: 'white', paddingVertical: 5, paddingStart: 20, paddingRight: 12
                    }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Mid-morning</Text>
                            <IconButton
                                icon={flagmidmorning ? "chevron-down-circle" : "chevron-up-circle"}
                                iconColor={theme.colors.primary}
                                size={24}
                                onPress={() => { setflagmidmorning(!flagmidmorning); }}
                            />
                        </View>
                        <ExpandableSection top expanded={flagmidmorning}>
                            <View style={{ paddingBottom: 12 }}>
                                {/* Time Picker */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Time:</Text>
                                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setOpen(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: 'grey',
                                                    padding: 0,
                                                    width: '60%',
                                                    color: 'black',
                                                    paddingStart: 12
                                                }}
                                                value={date?.toString()}
                                                placeholderTextColor="grey"
                                                placeholder="Select Time"
                                            />
                                            <View style={{
                                                position: "relative",
                                                right: '7%',
                                                justifyContent: 'center'
                                            }}>
                                                <Icon
                                                    source={require('../assets/icons/down.png')}
                                                    size={12}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Menu Options:</Text>

                                <View style={{ marginVertical: 4, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <Text style={{ fontWeight: "bold", color: 'black', fontSize: 16, marginRight: 6 }}>1.</Text>
                                    <TextInput
                                        style={{
                                            borderBottomWidth: 1,
                                            padding: 0,
                                            flex: 1,
                                            color: 'black',
                                            borderColor: 'grey',
                                        }}
                                        placeholder={`eg. Otameal + Banana`}
                                        // value={option?.}
                                        // onChangeText={(text) => handleInputChange(text, index)}
                                        placeholderTextColor="grey"
                                    />
                                </View>
                            </View>
                        </ExpandableSection>
                    </Card>

                    {/* lunch is required */}
                    <Card mode='contained' style={{
                        marginBottom: 16, backgroundColor: 'white', paddingVertical: 5, paddingStart: 20, paddingRight: 12
                    }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Lunch*</Text>
                            <IconButton
                                icon={flag ? "chevron-down-circle" : "chevron-up-circle"}
                                iconColor={theme.colors.primary}
                                size={24}
                                onPress={() => { setFlag(!flag); }}
                            />
                        </View>
                        <ExpandableSection top expanded={flag}>
                            <View style={{ paddingBottom: 12 }}>
                                {/* Time Picker */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Time:</Text>
                                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setOpen(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: 'grey',
                                                    padding: 0,
                                                    width: '60%',
                                                    color: 'black',
                                                    paddingStart: 12
                                                }}
                                                value={date?.toString()}
                                                placeholderTextColor="grey"
                                                placeholder="Select Time"
                                            />
                                            <View style={{
                                                position: "relative",
                                                right: '7%',
                                                justifyContent: 'center'
                                            }}>
                                                <Icon
                                                    source={require('../assets/icons/down.png')}
                                                    size={12}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Menu Options:</Text>
                                <FlatList
                                    data={menuOptions}
                                    keyExtractor={(item: any, index: number) => `index${index}`}
                                    renderItem={renderMenu}
                                    scrollEnabled={false}
                                />
                                <View style={{ alignItems: 'flex-end', marginTop: 6 }}>
                                    <Button disabled icon="plus-circle" mode="text" onPress={addMenuOption}>
                                        Add More
                                    </Button>
                                </View>
                            </View>
                        </ExpandableSection>
                    </Card>

                    {/* Late evening is optional */}
                    <Card mode='contained' style={{
                        marginBottom: 16, backgroundColor: 'white', paddingVertical: 5, paddingStart: 20, paddingRight: 12
                    }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Late evening</Text>
                            <IconButton
                                icon={flagmidmorning ? "chevron-down-circle" : "chevron-up-circle"}
                                iconColor={theme.colors.primary}
                                size={24}
                                onPress={() => { setflagmidmorning(!flagmidmorning); }}
                            />
                        </View>
                        <ExpandableSection top expanded={flagmidmorning}>
                            <View style={{ paddingBottom: 12 }}>
                                {/* Time Picker */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Time:</Text>
                                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setOpen(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: 'grey',
                                                    padding: 0,
                                                    width: '60%',
                                                    color: 'black',
                                                    paddingStart: 12
                                                }}
                                                value={date?.toString()}
                                                placeholderTextColor="grey"
                                                placeholder="Select Time"
                                            />
                                            <View style={{
                                                position: "relative",
                                                right: '7%',
                                                justifyContent: 'center'
                                            }}>
                                                <Icon
                                                    source={require('../assets/icons/down.png')}
                                                    size={12}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Menu Options:</Text>

                                <View style={{ marginVertical: 4, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <Text style={{ fontWeight: "bold", color: 'black', fontSize: 16, marginRight: 6 }}>1.</Text>
                                    <TextInput
                                        style={{
                                            borderBottomWidth: 1,
                                            padding: 0,
                                            flex: 1,
                                            color: 'black',
                                            borderColor: 'grey',
                                        }}
                                        placeholder={`eg. Otameal + Banana`}
                                        // value={option?.}
                                        // onChangeText={(text) => handleInputChange(text, index)}
                                        placeholderTextColor="grey"
                                    />
                                </View>
                            </View>
                        </ExpandableSection>
                    </Card>

                    {/* Dinner is required */}
                    <Card mode='contained' style={{
                        marginBottom: 16, backgroundColor: 'white', paddingVertical: 5, paddingStart: 20, paddingRight: 12
                    }}>
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Dinner*</Text>
                            <IconButton
                                icon={flag ? "chevron-down-circle" : "chevron-up-circle"}
                                iconColor={theme.colors.primary}
                                size={24}
                                onPress={() => { setFlag(!flag); }}
                            />
                        </View>
                        <ExpandableSection top expanded={flag}>
                            <View style={{ paddingBottom: 12 }}>
                                {/* Time Picker */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
                                    <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Time:</Text>
                                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setOpen(true)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                editable={false}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: 'grey',
                                                    padding: 0,
                                                    width: '60%',
                                                    color: 'black',
                                                    paddingStart: 12
                                                }}
                                                value={date?.toString()}
                                                placeholderTextColor="grey"
                                                placeholder="Select Time"
                                            />
                                            <View style={{
                                                position: "relative",
                                                right: '7%',
                                                justifyContent: 'center'
                                            }}>
                                                <Icon
                                                    source={require('../assets/icons/down.png')}
                                                    size={12}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ color: 'black', fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Menu Options:</Text>
                                <FlatList
                                    data={menuOptions}
                                    keyExtractor={(item: any, index: number) => `index${index}`}
                                    renderItem={renderMenu}
                                    scrollEnabled={false}
                                />
                                <View style={{ alignItems: 'flex-end', marginTop: 6 }}>
                                    <Button disabled icon="plus-circle" mode="text" onPress={addMenuOption}>
                                        Add More
                                    </Button>
                                </View>
                            </View>
                        </ExpandableSection>
                    </Card>

                </View>
            </ScrollView>
            <Button mode='contained' style={{ width: '100%', borderRadius: 0, position: 'absolute', bottom: 0 }} contentStyle={{ padding: 8 }} labelStyle={{ fontWeight: 'bold', fontSize: 15 }} onPress={() => { }}>Submit</Button>
        </View>
    );
}

export default memo(withTheme(FoodDetails));
