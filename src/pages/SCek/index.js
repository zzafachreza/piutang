import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';


export default function SCek({ navigation, route }) {
    const item = route.params;

    useEffect(() => {
        axios.post(apiURL + 'data2.php', {
            kode: route.params.kode
        }).then(rz => {
            console.log(rz.data);
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
                padding: 10,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.white,
                    }}>{item.nama_peminjam}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.white,
                    }}>Tanggal Pinjam : {item.tanggal}</Text>
                </View>

                <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: colors.danger
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.white
                    }}>Hapus</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
                padding: 10,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                    }}>Total piutang</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 22,
                        color: colors.white,
                    }}>Rp. {new Intl.NumberFormat().format(item.total)}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                    }}>Sisa piutang</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 22,
                        color: colors.white,
                    }}>Rp. {new Intl.NumberFormat().format(item.total)}</Text>
                </View>


            </View>

            <FloatingAction

                showBackground={false}

                onPressMain={x => navigation.navigate('SDaftar', item)}

            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})