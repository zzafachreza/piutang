import { Alert, StyleSheet, Text, View, Image, FlatList, TouchableWithoutFeedback, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API_URL, apiURL, getData, storeData } from '../../utils/localStorage';
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
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import ReactNativeBlobUtil from 'react-native-blob-util'
import RNFetchBlob from 'rn-fetch-blob'
import XLSX from 'xlsx';
import Share from 'react-native-share';
var RNFS = require('react-native-fs');

export default function SaldoDetail({ navigation, route }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const [total, setTotal] = useState({
        total_hutang: 0,
        total_bayar: 0,
        total_sisa: 0,
    })
    const __getTransaction = () => {
        getData('user').then(uu => {
            axios.post(API_URL + 'saldo', {
                kode: route.params.kode,
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })
        })
    }



    const exportDataToExcel = async () => {



        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        const THEFILE = RNFS.ExternalStorageDirectoryPath + '/saldo_' + moment().format('YYMMDDSHHmmSS') + '.xlsx';
        // Write generated excel to Storage
        await RNFS.writeFile(THEFILE, wbout, 'ascii').then((r) => {


            RNFetchBlob.android.addCompleteDownload({
                title: 'saldo_' + moment().format('YYMMDDSHHmmSS') + '.xlsx',
                description: 'Download berhsasil',
                mime: 'xlxs',
                path: THEFILE,
                showNotification: true,
            });

            Alert.alert('Catatan Piutang', `${THEFILE} berhasil di download . . .`)
        }).catch((e) => {
            console.log('Error', e);
            console.log('file', wbout);
        });

    }

    const handleClick = async () => {

        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {

                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }

    };

    const [tanggal, setTanggal] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
    })

    const __getTransactionFilter = () => {
        getData('user').then(uu => {
            axios.post(API_URL + 'saldo_filter', {
                fid_user: uu.id,
                awal: tanggal.awal,
                akhir: tanggal.akhir
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })
        })
    }

    const __renderItem = ({ item }) => {
        return (

            <TouchableWithoutFeedback onPress={() => Alert.alert('Catatan Piutang', 'Silahkan pilih', [

                {
                    text: 'TIDAK'
                },
                {
                    text: 'HAPUS',
                    onPress: () => {
                        axios.post(API_URL + 'saldo_hapus', {
                            id: item.id
                        }).then(rs => {
                            Alert.alert('Catatan Piutang', 'Transaksi berhasil dihapus !');
                            __getTransactionFilter();
                        })
                    }
                }
            ])}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.white,
                    backgroundColor: '#FFE3B0'
                }}>
                    <View style={{
                        flex: 1.5,
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                            fontSize: 13,
                            marginBottom: 10,
                        }}>{item.keterangan}</Text>
                        <Text style={{
                            color: '#A43309',
                            fontFamily: fonts.secondary[400],
                            fontSize: 12
                        }}>{item.tanggal} <Text style={{ color: '#827D81' }}>{item.jam}</Text></Text>
                    </View>
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            color: '#A43309',
                        }}>{item.tipe}</Text>

                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            color: colors.black,
                        }}>{new Intl.NumberFormat().format(item.total)}</Text>

                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[600],
                            fontSize: 14,
                            color: colors.black,
                        }}>{new Intl.NumberFormat().format(item.saldo)}</Text>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    const filterItems = (key, data) => {
        var query = key.toLowerCase();
        return data.filter(function (item) {
            return item.toLowerCase().indexOf(query) >= 0;
        })
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>




            <View style={{
                flex: 1,
                backgroundColor: '#F0F0F0'
            }}>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.white,
                    backgroundColor: colors.primary
                }}>
                    <View style={{
                        flex: 1.5,
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Keterangan</Text>

                    </View>
                    <View style={{
                        flex: 0.5,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Tipe</Text>

                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Nominal</Text>

                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Saldo Akhir</Text>

                    </View>
                </View>
                <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
            </View>








            <View style={{

                padding: 10,
            }}>

                <MyButton onPress={handleClick} warna={colors.success} title="Download Excel" Icons="download" />

            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 35
    },
    item: {
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 35
    }
})