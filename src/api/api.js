var defaultUrl = "https://bb8d7de4-746e-4f0f-8dbb-935b891aae26.mock.pstmn.io/"
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fecthing(redirection, data, type, headers ) {
    let returnedData = {};
    
    let url = defaultUrl + redirection

    if(type == 'GET' ){
      if(data !== undefined ){
        if(data !== ""){
        url += "?" + new URLSearchParams(data)}
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
        headers: headers,
        redirect: 'follow'

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
    myHeaders.append("Cache-Control", "no-cache");

    let data = await fecthing("usersite",undefined,'GET', myHeaders)
    return data
}

export async function gettingGraph(token,siteId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:siteId}

  let data = await fecthing("getGraphList",params,'GET', myHeaders)
  return data
}

export async function gettingNotifications(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Cache-Control", "no-cache");


    let data = await fecthing("userNotification",undefined,'GET', myHeaders)
    return data
}

export async function gettingSiteData(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Cache-Control", "no-cache");

    let params = {}//{id:siteId}

    let data = await fecthing("getSiteData", params,'GET', myHeaders)
    return data
}

export async function gettingUserAlarms(token,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Cache-Control", "no-cache");

    let params = {}//{id:siteId}

    let data = await fecthing("getUserAlarms", params,'GET', myHeaders)
    return data
}

export async function gettingAlarmsList(token,alarmId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:alarmId}

  let data = await fecthing("getAlarmsList", params,'GET', myHeaders)
  return data
}

export async function gettingGraphInfo(token,graphId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:graphId}
  
  let data = await fecthing("graphInfo", params,'GET', myHeaders)
  return data
}

export async function gettingFluxInfo(token,graphId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:graphId}
  
  let data = await fecthing("fluxInfo", params,'GET', myHeaders)
  return data
}

export async function gettingGraphData(token,graphId,granularity,date,endDate) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:graphId,granularity:granularity,date:date,endDate:endDate}
  
  let data = await fecthing("getGraphics", params,'GET', myHeaders)
  
  return data
}

export async function gettingFluxData(token,graphId,granularity,date,endDate) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {}//{id:graphId,granularity:granularity,date:date,endDate:endDate}
  
  let data = await fecthing("getFlux", params,'GET', myHeaders)
  
  return data
}

export async function gettingWidgetData(token,widgetId,widgetType) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Cache-Control", "no-cache");

  let params = {"widget" : widgetType}
  
  let data = await fecthing("getWidget", params,'GET', myHeaders)
  
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