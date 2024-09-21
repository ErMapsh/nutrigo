import React, { memo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Appbar, Button, Card, withTheme } from 'react-native-paper'
import { ExpandableSection } from 'react-native-ui-lib'

function FoodDetails({ theme, navigation }: any) {
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{
                backgroundColor: "#FFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 8,
            }}>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Food Recall Details" style={{ alignItems: 'center', }} titleStyle={{ fontFamily: "" }} />
                <Appbar.Action icon="headset" onPress={() => { }} />
            </Appbar.Header>
            <ScrollView>
                <View style={{
                    backgroundColor: theme.colors.secondaryContainer,
                    padding: 18
                }}>
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 16
                    }}>
                        Please tell us about the meals that you eat on a day-to-day basis. Mention a veriety of options & not just one.
                    </Text>
                </View>
                <View style={{ padding: 12 }}>
                    <Card mode='contained' >
                        <Card.Content>
                            <View>
                                <Text>Breakfast*</Text>
                            </View>
                            <ExpandableSection
                                top
                                expanded={false}
                                onPress={() => console.log('pressed')}
                            >
                                <Text>The section header</Text>
                            </ExpandableSection >
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}

export default memo(withTheme(FoodDetails))
