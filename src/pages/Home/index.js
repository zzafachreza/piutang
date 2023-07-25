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
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

export default function Home({ navigation }) {

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
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'data.php', {
        id_user: res.id
      }).then(x => {
        console.log(x.data);
        setData(x.data);

        let tmptotal = 0;
        let tmpbayar = 0;
        let tmpsisa = 0;
        x.data.map(i => {
          tmptotal += parseFloat(i.total);
          tmpbayar += parseFloat(i.bayar);
          tmpsisa += parseFloat(i.sisa);
        })

        setTotal({
          total_hutang: tmptotal,
          total_bayar: tmpbayar,
          total_sisa: tmpsisa
        })
      })
    })
  }

  const [tanggal, setTanggal] = useState({
    awal: moment().format('YYYY-MM-DD'),
    akhir: moment().format('YYYY-MM-DD'),
  })

  const __getTransactionFilter = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'data.php', {
        id_user: res.id,
        awal: tanggal.awal,
        akhir: tanggal.akhir
      }).then(x => {
        console.log(x.data);
        setData(x.data);

        let tmptotal = 0;
        let tmpbayar = 0;
        let tmpsisa = 0;
        x.data.map(i => {
          tmptotal += parseFloat(i.total);
          tmpbayar += parseFloat(i.bayar);
          tmpsisa += parseFloat(i.sisa);
        })

        setTotal({
          total_hutang: tmptotal,
          total_bayar: tmpbayar,
          total_sisa: tmpsisa
        })
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
          }}>{moment(item.tanggal).format('dddd, DD MMM YYYY')}</Text>
          <View style={{
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 40,
                color: colors.primary,
              }}>Jumlah Hutang</Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 30
              }}>Rp {new Intl.NumberFormat().format(item.total)}</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 40,
                color: colors.primary,
              }}>Sudah Bayar</Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 30
              }}>Rp {new Intl.NumberFormat().format(item.bayar)}</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 40,
                color: colors.primary,
              }}>Sisa Piutang</Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 30
              }}>Rp {new Intl.NumberFormat().format(item.sisa)}</Text>
            </View>
          </View>
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

        <MyInput placeholder="Pencarian data" onChangeText={x => {
          console.log('jumlah huruf', x.length);
          const cekk = data.filter(i => i.nama_peminjam.toString().toLowerCase().indexOf(x.toString().toLowerCase()) > -1);
          if (cekk.length > 0) {
            setData(cekk);
          } else if (x.length == 0) {
            __getTransaction();
          }

        }} />

      </View>

      <View style={{
        flexDirection: 'row',
        margin: 10
      }}>
        <View style={{
          flex: 1,
          paddingRight: 5,
        }}>
          <DatePicker
            style={{ width: '100%', }}
            date={tanggal.awal}
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
                borderColor: colors.primary,
                borderRadius: 5,
                marginLeft: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { setTanggal({ ...tanggal, awal: date }) }}
          />
        </View>
        <View style={{
          flex: 1,
          paddingLeft: 5,
        }}>
          <DatePicker
            style={{ width: '100%' }}
            date={tanggal.akhir}
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
                borderColor: colors.primary,
                borderRadius: 5,
                marginLeft: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { setTanggal({ ...tanggal, akhir: date }) }}
          />
        </View>
        <View style={{
          marginLeft: 10,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
          <TouchableOpacity onPress={__getTransactionFilter} style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            alignItems: 'center'


          }}>
            <Icon type='ionicon' name='filter' size={15} color={colors.white} />
            <Text style={{
              left: 2,
              fontFamily: fonts.secondary[600],
              color: colors.white
            }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />









      <View style={{
        backgroundColor: colors.white,
        padding: 10,
        flexDirection: 'row'
      }} >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 30,
            color: colors.primary
          }}>Total Hutang</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.black
          }}>Rp {new Intl.NumberFormat().format(total.total_hutang)}</Text>
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 30,
            color: colors.primary
          }}>Total Bayar</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.black
          }}>Rp {new Intl.NumberFormat().format(total.total_bayar)}</Text>
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 30,
            color: colors.primary
          }}>Total Sisa Piutang</Text>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.black
          }}>Rp {new Intl.NumberFormat().format(total.total_sisa)}</Text>
        </View>
      </View>

      {/* <View style={{
        flexDirection: 'row'
      }}>
        <View style={{
          padding: 10,
          flex: 1,
        }}>
          <MyButton onPress={() => navigation.navigate('Mutasi')} title="Laporan Mutasi" warna={colors.success} />
        </View>
        <View style={{
          padding: 10,
          flex: 1,
        }}>
          <MyButton onPress={() => navigation.navigate('SAdd')} title="Tambah Baru" warna={colors.primary} />
        </View>
      </View> */}

      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'space-around',
        padding: 5,
        // height: 80
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('Mutasi')} style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
          <Icon type='ionicon' name='file-tray-stacked-outline' color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            color: colors.white
          }}>Laporan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SAdd')} style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
          <Icon type='ionicon' name='duplicate-outline' color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            color: colors.white
          }}>Tambah Baru</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Saldo')} style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
          <Icon type='ionicon' name='receipt-outline' color={colors.white} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            color: colors.white
          }}>Saldo</Text>
        </TouchableOpacity>
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