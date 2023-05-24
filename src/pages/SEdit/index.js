import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import DatePicker from 'react-native-datepicker'

export default function SEdit({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    console.log(route.params);

    const [kirim, setKirim] = useState({});

    useEffect(() => {
        getData('user').then(u => setKirim({
            ...kirim,
            kode: route.params.kode,
            total: route.params.total,
            sisa: route.params.sisa,
            nama_peminjam: route.params.nama_peminjam,
            keterangan: route.params.keterangan,
            fid_user: u.id
        }))
    }, []);


    const sendServer = () => {
        console.log(kirim);
        setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + 'edit.php', kirim).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('Catatan Piutang', 'Data berhasil disimpan !')
                navigation.replace('Home');
            })
        }, 1200)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <MyInput label="Nama Peminjam" value={kirim.nama_peminjam} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        nama_peminjam: x
                    })
                }} iconname="person" placeholder="masukan nama peminjam" />
                <MyGap jarak={10} />
                <MyInput value={kirim.total} keyboardType="number-pad" label="Total hutang" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        total: x
                    })
                }} placeholder="masukan jumbah piutang" iconname="wallet" />
                <MyGap jarak={10} />
                <MyInput value={kirim.sisa} keyboardType="number-pad" label="Sisa hutang" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        sisa: x
                    })
                }} placeholder="masukan jumbah piutang" iconname="wallet" />
                <MyGap jarak={10} />
                <MyInput label="Keterangan" value={kirim.keterangan} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        keterangan: x
                    })
                }} iconname="create" placeholder="masukan keterangan" multiline />
            </ScrollView>
            {!loading && <MyButton onPress={sendServer} title="Tambahkan" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})