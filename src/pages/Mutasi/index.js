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
import { ActivityIndicator } from 'react-native';

export default function Mutasi({ navigation }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            // __getTransaction();
        }

    }, [isFocused]);

    const [total, setTotal] = useState({
        total_hutang: 0,
        total_bayar: 0,
        total_sisa: 0,
    })


    const [tanggal, setTanggal] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
    });

    const [loading, setLoading] = useState(false);

    const __getTransactionFilter = () => {
        setLoading(true)
        getData('user').then(res => {
            setUser(res);
            axios.post(apiURL + 'mutasi.php', {
                id_user: res.id,
                awal: tanggal.awal,
                akhir: tanggal.akhir
            }).then(x => {

                console.log(x.data);
                setData(x.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1200)



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
            {/* data */}

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}


            {!loading && <ScrollView showsVerticalScrollIndicator={false} style={{
                flex: 1,
            }}>

                <View style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    padding: 5,
                    borderBottomColor: colors.border,
                    backgroundColor: colors.secondary,
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                    }}>Tanggal</Text>
                    <View style={{
                        flex: 2,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Nama</Text>

                    </View>


                    <Text style={{
                        flex: 0.8,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                    }}>Bayar</Text>
                    <Text style={{
                        flex: 0.8,
                        textAlign: 'right',
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                    }}>Hutang</Text>
                </View>

                {data.map((i, index) => {


                    let tgl = '';
                    let nama = '';

                    if (index == 0) {
                        tgl = moment(data[index].tanggal).format('DD/MM/YYYY');
                    } else if (data[index - 1].tanggal !== data[index].tanggal) {
                        tgl = moment(data[index].tanggal).format('DD/MM/YYYY');
                    } else { tgl = ''; }



                    return (
                        <View style={{
                            marginHorizontal: 10,
                            marginVertical: 5,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                            }}>{tgl}</Text>
                            <View style={{
                                flex: 2,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                }}>{i.nama_peminjam}</Text>

                            </View>


                            <Text style={{
                                flex: 0.8,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{i.jenis == 'CR' ? new Intl.NumberFormat().format(i.total) : ''}</Text>
                            <Text style={{
                                flex: 0.8,
                                textAlign: 'right',
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{i.jenis == 'DB' ? new Intl.NumberFormat().format(i.total) : ''}</Text>
                        </View>

                    )
                })}

            </ScrollView>}






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