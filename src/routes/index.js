import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  SCek,
  SPenyakit,
  STentang,
  SHasil,
  SDaftar,
  SAdd,
  SHutang,
  SEdit,
  EditDetail,
  Mutasi,
  Saldo,
  SaldoAdd,
  SaldoDetail,
} from '../pages';
import { colors } from '../utils';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SaldoDetail"
        component={SaldoDetail}
        options={{
          headerShown: false,
          headerTitle: 'Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="SAdd"
        component={SAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambahkan Piutang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Mutasi"
        component={Mutasi}
        options={{
          headerShown: true,
          headerTitle: 'Laporan Mutasi',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SEdit"
        component={SEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Piutang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="EditDetail"
        component={EditDetail}
        options={{
          headerShown: true,
          headerTitle: 'Edit Detail Piutang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: 'Daftar',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="SDaftar"
        component={SDaftar}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Bayar Hutang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="SHutang"
        component={SHutang}
        options={{
          headerShown: true,
          headerTitle: 'Tambahkan Hutang Baru',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="SCek"
        component={SCek}
        options={{
          headerShown: true,
          headerTitle: 'Detail Piutang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SPenyakit"
        component={SPenyakit}
        options={{
          headerShown: true,
          headerTitle: 'Indeks Penyakit',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}

      />

      <Stack.Screen
        name="STentang"
        component={STentang}
        options={{
          headerShown: false,
          headerTitle: 'Tentang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SHasil"
        component={SHasil}
        options={{
          headerShown: false,
          headerTitle: 'Hasil Analisa',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Saldo"
        component={Saldo}
        options={{
          headerShown: false,
          headerTitle: 'Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="SaldoAdd"
        component={SaldoAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />



    </Stack.Navigator>
  );
}
