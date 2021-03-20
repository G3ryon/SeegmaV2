var defaultUrl = "https://a0b40a79-56fc-4091-b035-8a6ce0cf5c72.mock.pstmn.io/"
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fecthing(redirection, data, type, headers ) {
    let returnedData = {};
    
    let url = defaultUrl + redirection

    if(type == 'GET' ){
      if(data !== undefined){
        //url += "?" + new URLSearchParams(data)
      }
      
      await fetch(url, {
        method: type,
        headers: headers

    }).then(response => response.text())
        .then(result => {returnedData = JSON.parse(result);})
        .catch(error => console.log('error', error));
        
    }
    else{
      await fetch(url, {
        method: type,
        body: data,
        headers: headers

    }).then(response => response.text())
        .then(result => {returnedData = JSON.parse(result);})
        .catch(error => console.log('error', error));
        
    }
    return returnedData
}

export async function authentification(login,password) {

    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);

    let data = await fecthing("signin", formdata,'POST')
    return data
}

export async function reset(mail) {

    var formdata = new FormData();
    formdata.append("email", mail);

    let data = await fecthing("reset", formdata,'POST')
    return data
}

export async function signup(mail, username, password) {

    var formdata = new FormData();
    formdata.append("email", mail);
    formdata.append("username", username);
    formdata.append("password", password);

    let data = await fecthing("signup", formdata,'POST')
    return data
}

export async function gettingSite(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    let data = await fecthing("usersite",undefined,'POST', myHeaders)
    return data
}

export async function gettingGraph(token,siteId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("siteId", siteId);

  let data = await fecthing("getGraphList",undefined,'POST', myHeaders)
  return data
}

export async function gettingNotifications(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    let data = await fecthing("userNotification",undefined,'POST', myHeaders)
    return data
}

export async function gettingSiteData(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("siteId", siteId);

    let data = await fecthing("getSiteData", formdata,'POST', myHeaders)
    return data
}

export async function gettingUserAlarms(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("siteId", siteId);

    let data = await fecthing("getUserAlarms", formdata,'POST', myHeaders)
    return data
}

export async function gettingAlarmsList(token,alarmId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var formdata = new FormData();
  formdata.append("alarmId", alarmId);

  let data = await fecthing("getAlarmsList", formdata,'POST', myHeaders)
  return data
}

export async function gettingGraphInfo(token,graphId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  let params = {id:graphId}
  
  let data = await fecthing("graphInfo", params,'GET', myHeaders)
  return data
}

export async function gettingGraphData(token,graphId,granularity,date,endDate) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  let params = {id:graphId,granularity:granularity,date:date,endDate:endDate}
  
  let data = await fecthing("getGraphics", params,'GET', myHeaders)
  
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