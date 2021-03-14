var url = "https://e44199eb-d3ab-476b-b57e-ad77e559bc66.mock.pstmn.io/"
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fecthing(redirection, data, headers) {
    let returnedData = {};

    await fetch(url + redirection, {
        method: 'POST',
        body: data,
        headers: headers

    }).then(response => response.text())
        .then(result => {returnedData = JSON.parse(result);})
        .catch(error => console.log('error', error));
    return returnedData
    
}

export async function authentification(login,password) {

    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);

    let data = await fecthing("signin", formdata)
    return data
}

export async function reset(mail) {

    var formdata = new FormData();
    formdata.append("email", mail);

    let data = await fecthing("reset", formdata)
    return data
}

export async function signup(mail, username, password) {

    var formdata = new FormData();
    formdata.append("email", mail);
    formdata.append("username", username);
    formdata.append("password", password);

    let data = await fecthing("signup", formdata)
    return data
}

export async function gettingSite(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    let data = await fecthing("usersite", myHeaders)
    return data
}

export async function gettingGraph(token,siteId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("siteId", siteId);

  let data = await fecthing("getGraphList", myHeaders)
  return data
}

export async function gettingNotifications(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    let data = await fecthing("userNotification", myHeaders)
    return data
}

export async function gettingSiteData(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("siteId", siteId);

    let data = await fecthing("getSiteData", formdata, myHeaders)
    return data
}

export async function gettingUserAlarms(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("siteId", siteId);

    let data = await fecthing("getUserAlarms", formdata, myHeaders)
    return data
}

export async function gettingAlarmsList(token,alarmId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("alarmId", alarmId);

  let data = await fecthing("getAlarmsList", formdata, myHeaders)
  return data
}

export const storeData = async (value, key) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}