import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'

export default function EditDetail({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState(route.params);

    useEffect(() => {



    }, []);


    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + 'edit2.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('Catatan Piutang', 'Data berhasil disimpan !')
                console.log(kirim);
                navigation.goBack();
            })
        }, 1200)
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <Text style={{
                marginBottom: 10,
                padding: 10,
                backgroundColor: kirim.jenis == 'CR' ? colors.success : colors.danger
                , borderRadius: 10,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: 20,
                color: colors.white
            }}>{kirim.jenis == 'CR' ? 'BAYAR HUTANG' : 'TAMBAH HUTANG'}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.tanggal}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            backgroundColor: colors.zavalabs,
                            borderColor: colors.zavalabs,
                            borderRadius: 10,
                            // borderWidth: 1,
                            paddingLeft: 10,
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.primary[400],

                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setKirim({ ...kirim, tanggal: date })}
                />
                <MyGap jarak={10} />
                <MyInput label="Keterangan" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        keterangan: x
                    })
                }} iconname="create" value={kirim.keterangan} placeholder="masukan keterangan" multiline />
                <MyGap jarak={10} />
                <MyInput keyboardType="number-pad" value={kirim.total_bayar} label="Jumlah" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        total_bayar: x
                    })
                }} placeholder="masukan jumbah piutang" iconname="wallet" />
                <MyGap jarak={10} />
                {kirim.jenis == 'CR' &&
                    <MyPicker iconname="grid" value={kirim.tipe} onValueChange={x => setKirim({
                        ...kirim,
                        tipe: x
                    })} label="Metode Pembayaran" data={[
                        {
                            label: 'Transfer Bank',
                            value: 'Transfer Bank',
                        },
                        {
                            label: 'Cash',
                            value: 'Cash',
                        }
                    ]} />}



            </ScrollView>
            {!loading && <MyButton onPress={sendServer} title="Tambahkan" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})