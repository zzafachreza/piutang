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
    const [data, setData] = useState([]);
    const [sisa, setSisa] = useState(0);
    const [datah, setDataH] = useState({});
    const [total_hutang, setTotal_hutang] = useState(route.params.total);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
            __getTransactionHeader();
        }

    }, [isFocused]);


    const __getTransaction = () => {
        axios.post(apiURL + 'data2.php', {
            kode: route.params.kode
        }).then(rz => {
            setData(rz.data)
        })
    }

    const __getTransactionHeader = () => {
        axios.post(apiURL + 'data_piutang.php', {
            kode: route.params.kode
        }).then(rz => {
            console.log(rz.data)
            setDataH(rz.data)
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SHasil', item)} style={{
                margin: 5,
                padding: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs
            }}>

                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        justifyContent: 'flex-end',
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35,
                        backgroundColor: colors.black,
                        color: colors.white,
                        textAlign: 'center',
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        width: 100,
                    }}>{item.jenis == "CR" ? "Bayar" : "Tambah Hutang"}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 28
                    }}>{item.keterangan}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28
                    }}>{item.tanggal}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28,
                        color: colors.primary,
                    }}>{item.tipe}</Text>

                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20
                    }}>Rp {new Intl.NumberFormat().format(item.total_bayar)}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='search' size={windowWidth / 25} color={colors.primary} />
                </View>
            </TouchableOpacity >
        )
    }



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

                <TouchableOpacity onPress={() => {
                    Alert.alert('Catatan Piutang', 'Apakah kamu yakin akan hapus ini ?', [
                        {
                            style: 'cancel',
                            text: 'Batal'
                        },
                        {
                            style: 'default',
                            text: 'Hapus',
                            onPress: () => {

                                axios.post(apiURL + 'delete_header.php', {
                                    kode: item.kode
                                }).then(res => {
                                    navigation.goBack();
                                })
                            }
                        }
                    ])
                }} style={{
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
                    }}>Rp. {new Intl.NumberFormat().format(datah.total)}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                    }}>Total Bayar</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 22,
                        color: colors.white,
                    }}>Rp. {new Intl.NumberFormat().format(datah.bayar)}</Text>
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
                    }}>Rp. {new Intl.NumberFormat().format(datah.sisa)}</Text>
                </View>


            </View>


            <FlatList data={data} renderItem={__renderItem} />


            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>
                    <MyButton onPress={() => navigation.navigate('SHutang', item)} Icons="duplicate-outline" title="Tambah Hutang" warna={colors.primary} />
                </View>
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>
                    <MyButton onPress={() => navigation.navigate('SDaftar', item)} Icons="shield-checkmark-outline" title="Bayar Hutang" warna={colors.success} />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})