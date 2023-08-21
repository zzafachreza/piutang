import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import moment from 'moment';
import 'moment/locale/id';
export default function SCek({ navigation, route }) {
    moment.locale('id')
    const item = route.params;
    const [data, setData] = useState([]);
    const [sisa, setSisa] = useState(0);
    const [print, setPrint] = useState(false);
    const [datah, setDataH] = useState({
        total: 0,
        bayar: 0,
        sisa: 0,
    });
    const ref = useRef();

    const [total_hutang, setTotal_hutang] = useState(route.params.total);
    const [myshare, setMyShare] = useState('');

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }


    }, [isFocused]);


    const __getTransaction = () => {
        axios.post(apiURL + 'data2.php', {
            kode: route.params.kode
        }).then(rz => {
            let totalHutang = 0;
            let TotalBayar = 0;

            rz.data.map(i => {
                if (i.jenis == 'DB') {
                    totalHutang += parseFloat(i.total_bayar)
                } else {
                    TotalBayar += parseFloat(i.total_bayar)
                }

            })
            console.log('hutang', totalHutang)
            console.log('bayar', TotalBayar)
            setData(rz.data)
            setDataH({
                total: totalHutang,
                bayar: TotalBayar,
                sisa: totalHutang - TotalBayar,
            })
        })
    }

    // const __getTransactionHeader = () => {
    //     axios.post(apiURL + 'data_piutang.php', {
    //         kode: route.params.kode
    //     }).then(rz => {
    //         console.log(rz.data)

    //     })
    // }

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SHasil', item)} style={{
                marginHorizontal: 2,
                padding: 3,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white
            }}>

                <View style={{
                    flex: 1,
                }}>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 35
                    }}>{item.keterangan}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35
                    }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 40,
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
                        fontSize: windowWidth / 32
                    }}>Rp {new Intl.NumberFormat().format(item.total_bayar)}</Text>
                    <Text style={{
                        justifyContent: 'flex-end',
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 45,
                        backgroundColor: item.jenis == "CR" ? colors.primary : colors.black,
                        color: colors.white,
                        textAlign: 'center',
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        width: 80,
                    }}>{item.jenis == "CR" ? "Bayar" : "Hutang"}</Text>
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
        <>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: colors.white
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.primary,
                    justifyContent: 'space-around'
                }}>

                    <TouchableOpacity onPress={() => navigation.navigate('SEdit', item)} style={{
                        padding: 10,
                        width: windowWidth / 3,
                        backgroundColor: colors.white
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.primary,
                            textAlign: 'center',
                        }}>Edit</Text>
                    </TouchableOpacity>


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
                        width: windowWidth / 3,
                        backgroundColor: colors.danger
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            color: colors.white,
                            textAlign: 'center',
                        }}>Hapus</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {


                        try {
                            setPrint(false);
                        } finally {
                            ref.current.capture().then(uri => {
                                console.log("do something with ", uri);
                                Share.open({
                                    url: uri
                                })
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        err && console.log(err);
                                    });
                            });
                        }



                    }} style={{
                        padding: 10,
                        backgroundColor: colors.success,
                        width: windowWidth / 3,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 30,
                            textAlign: 'center',
                            color: colors.white
                        }}>Bagikan</Text>
                    </TouchableOpacity>
                </View>
                <ViewShot style={{
                    flex: 1,
                }} ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: print ? colors.danger : colors.primary,
                        padding: 10,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
                                color: colors.white,
                            }}>{item.nama_peminjam}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 35,
                                color: colors.white,
                            }}>Tanggal Pinjam : {moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('SaldoDetail', {
                            kode: item.kode
                        })} style={{
                            backgroundColor: colors.white,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary
                            }}>SALDO</Text>
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
                                fontSize: windowWidth / 35,
                                color: colors.white,
                            }}>Total piutang</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
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
                                fontSize: windowWidth / 35,
                                color: colors.white,
                            }}>Total Bayar</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,
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
                                fontSize: windowWidth / 30,
                                color: colors.white,
                            }}>Sisa piutang</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 35,
                                color: colors.white,
                            }}>Rp. {new Intl.NumberFormat().format(datah.sisa)}</Text>
                        </View>


                    </View>


                    <FlatList data={data} renderItem={__renderItem} />




                </ViewShot>

                <MyGap jarak={10} />
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.white
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

        </>
    )
}

const styles = StyleSheet.create({})