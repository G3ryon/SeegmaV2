var url = "https://36e69cb8-cc8f-49fe-b48b-8ed4b2a2d9e9.mock.pstmn.io/"
import React, { Component } from 'react';

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

export async function gettingSite(token,userId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("userId", userId);

    let data = await fecthing("usersite", formdata, myHeaders)
    return data
}

export async function gettingNotifications(token,userId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("userId", userId);

    let data = await fecthing("userNotification", formdata, myHeaders)
    return data
}

export async function gettingSiteData(token,userId,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("siteId", siteId);

    let data = await fecthing("getSiteData", formdata, myHeaders)
    return data
}

export async function gettingUserAlarms(token,userId,siteId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("siteId", siteId);

    let data = await fecthing("getUserAlarms", formdata, myHeaders)
    return data
}