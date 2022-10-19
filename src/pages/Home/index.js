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

export default function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'data.php', {
        id_user: res.id
      }).then(x => {
        console.log(x.data);
        setData(x.data);
      })
    })
  }

  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('SCek', item)} style={{
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
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 28
          }}>{item.nama_peminjam}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 28
          }}>{item.tanggal}</Text>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20
          }}>Rp {new Intl.NumberFormat().format(item.total)}</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='chevron-forward' size={windowWidth / 25} color={colors.primary} />
        </View>
      </TouchableOpacity>
    )
  }




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang,</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{user.nama_lengkap}</Text>
          </View>

          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{
            paddingHorizontal: 10,

            flexDirection: 'row',
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" size={windowWidth / 30} name="log-out-outline" color={colors.white} />
            <Text style={{
              left: 5,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.white
            }}>Keluar</Text>
          </TouchableOpacity>
        </View>

        <MyInput placeholder="Pencarian data" />

      </View>


      <FlatList data={data} renderItem={__renderItem} />







      <FloatingAction

        showBackground={false}

        onPressMain={x => navigation.navigate('SAdd')}

      />

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